const DB_NAME = "kadeshfood_pos_v1";
const DB_VERSION = 1;

function openPosDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains("pos_cache")) {
        db.createObjectStore("pos_cache");
      }

      if (!db.objectStoreNames.contains("pending_orders")) {
        const store = db.createObjectStore("pending_orders", { keyPath: "id" });
        store.createIndex("tenantId", "tenantId", { unique: false });
        store.createIndex("status", "status", { unique: false });
      }

      if (!db.objectStoreNames.contains("meta")) {
        db.createObjectStore("meta");
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function requestToPromise(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function withStore(storeName, mode, callback) {
  const db = await openPosDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, mode);
    const store = tx.objectStore(storeName);

    Promise.resolve(callback(store))
      .then(resolve)
      .catch(reject);

    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}

export async function savePosCache(tenantId, data) {
  await withStore("pos_cache", "readwrite", (store) => {
    store.put(
      {
        data,
        cachedAt: new Date().toISOString(),
      },
      String(tenantId),
    );
  });
}

export async function getPosCache(tenantId) {
  return withStore("pos_cache", "readonly", (store) =>
    requestToPromise(store.get(String(tenantId))),
  );
}

export async function getNextLocalToken(tenantId) {
  const key = `token_counter_${tenantId}`;

  return withStore("meta", "readwrite", async (store) => {
    const current = (await requestToPromise(store.get(key))) || { value: 0 };
    const next = current.value + 1;
    store.put({ value: next }, key);
    return `O-${String(next).padStart(3, "0")}`;
  });
}

export async function addPendingOrder(order) {
  await withStore("pending_orders", "readwrite", (store) => {
    store.put(order);
  });
  return order;
}

export async function updatePendingOrder(order) {
  await withStore("pending_orders", "readwrite", (store) => {
    store.put(order);
  });
  return order;
}

export async function getPendingOrders(tenantId) {
  return withStore("pending_orders", "readonly", (store) =>
    requestToPromise(store.index("tenantId").getAll(String(tenantId))),
  );
}

export async function countPendingOrders(tenantId) {
  const orders = await getPendingOrders(tenantId);
  return orders.filter((o) => o.status === "pending" || o.status === "failed").length;
}
