import {
  createOrder,
  createOrderAndInvoice,
  initPOS,
} from "../controllers/pos.controller";
import { isNetworkError } from "../helpers/networkError";
import {
  addPendingOrder,
  countPendingOrders,
  getNextLocalToken,
  getPosCache,
  getPendingOrders,
  savePosCache,
  updatePendingOrder,
} from "./posOfflineDb";

export { isNetworkError };

export async function initPOSWithCache(tenantId) {
  try {
    const res = await initPOS();

    if (res.status === 200 && tenantId) {
      await savePosCache(tenantId, res.data);
    }

    return { ...res, fromCache: false, offline: false };
  } catch (error) {
    if (!tenantId) throw error;

    const cached = await getPosCache(tenantId);

    if (cached?.data) {
      return {
        status: 200,
        data: cached.data,
        fromCache: true,
        offline: true,
        cachedAt: cached.cachedAt,
      };
    }

    throw error;
  }
}

async function queueLocalOrder(tenantId, type, payload) {
  const id = crypto.randomUUID();
  const idempotencyKey = crypto.randomUUID();
  const localTokenNo = await getNextLocalToken(tenantId);
  const createdAt = new Date().toISOString();

  const order = {
    id,
    idempotencyKey,
    tenantId: String(tenantId),
    type,
    status: "pending",
    createdAt,
    localTokenNo,
    payload,
    errorMessage: null,
    serverOrderId: null,
    serverTokenNo: null,
  };

  await addPendingOrder(order);

  return {
    status: 200,
    data: {
      message: "offline_order_saved",
      orderId: id,
      tokenNo: localTokenNo,
      offline: true,
    },
    offline: true,
  };
}

export async function createOrderOfflineAware(tenantId, payload) {
  if (navigator.onLine) {
    try {
      const res = await createOrder(
        payload.cart,
        payload.deliveryType,
        payload.customerType,
        payload.customer,
        payload.tableId,
        payload.selectedQrOrderItem,
        { idempotencyKey: payload.idempotencyKey },
      );

      return { ...res, offline: false };
    } catch (error) {
      if (!isNetworkError(error)) throw error;
    }
  }

  if (payload.selectedQrOrderItem) {
    throw new Error("qr_order_offline_unavailable");
  }

  return queueLocalOrder(tenantId, "order", payload);
}

export async function createOrderAndInvoiceOfflineAware(tenantId, payload) {
  if (navigator.onLine) {
    try {
      const res = await createOrderAndInvoice(
        payload.cart,
        payload.deliveryType,
        payload.customerType,
        payload.customer,
        payload.tableId,
        payload.netTotal,
        payload.taxTotal,
        payload.serviceChargeTotal,
        payload.total,
        payload.selectedQrOrderItem,
        payload.selectedPaymentType,
        { idempotencyKey: payload.idempotencyKey },
      );

      return { ...res, offline: false };
    } catch (error) {
      if (!isNetworkError(error)) throw error;
    }
  }

  if (payload.selectedQrOrderItem) {
    throw new Error("qr_order_offline_unavailable");
  }

  return queueLocalOrder(tenantId, "order_and_invoice", payload);
}

export async function refreshPendingCount(tenantId) {
  if (!tenantId) return 0;
  return countPendingOrders(tenantId);
}

export async function syncPendingOrders(tenantId) {
  if (!tenantId || !navigator.onLine) {
    return { synced: 0, failed: 0 };
  }

  const pending = (await getPendingOrders(tenantId)).filter(
    (order) => order.status === "pending" || order.status === "failed",
  );

  let synced = 0;
  let failed = 0;

  for (const order of pending) {
    try {
      await updatePendingOrder({ ...order, status: "syncing", errorMessage: null });

      const options = {
        idempotencyKey: order.idempotencyKey,
        offlineCreatedAt: order.createdAt,
      };

      const { payload } = order;
      let res;

      if (order.type === "order_and_invoice") {
        res = await createOrderAndInvoice(
          payload.cart,
          payload.deliveryType,
          payload.customerType,
          payload.customer,
          payload.tableId,
          payload.netTotal,
          payload.taxTotal,
          payload.serviceChargeTotal,
          payload.total,
          payload.selectedQrOrderItem,
          payload.selectedPaymentType,
          options,
        );
      } else {
        res = await createOrder(
          payload.cart,
          payload.deliveryType,
          payload.customerType,
          payload.customer,
          payload.tableId,
          payload.selectedQrOrderItem,
          options,
        );
      }

      if (res.status === 200) {
        await updatePendingOrder({
          ...order,
          status: "synced",
          serverOrderId: res.data?.orderId ?? null,
          serverTokenNo: res.data?.tokenNo ?? null,
          errorMessage: null,
        });
        synced += 1;
      } else {
        throw new Error("sync_failed");
      }
    } catch (error) {
      failed += 1;
      await updatePendingOrder({
        ...order,
        status: "failed",
        errorMessage: error?.response?.data?.message || error.message || "sync_failed",
      });
    }
  }

  return { synced, failed };
}
