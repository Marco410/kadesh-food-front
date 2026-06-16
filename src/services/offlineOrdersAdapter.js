import { getPendingOrders, getPosCache } from "./posOfflineDb";

const ACTIVE_SYNC_STATUSES = new Set(["pending", "failed", "syncing"]);

function cartItemToOrderItem(cartItem, orderLocalId, itemIndex, createdAt) {
  return {
    id: `${orderLocalId}-item-${itemIndex}`,
    order_id: orderLocalId,
    item_id: cartItem.id,
    item_title: cartItem.title,
    variant_id: cartItem.variant_id || cartItem.variant?.id || null,
    variant_title: cartItem.variant?.title || null,
    quantity: cartItem.quantity,
    status: "created",
    date: createdAt,
    addons: cartItem.addons?.map((addon) => ({
      id: addon.id,
      title: addon.title,
    })) || [],
    notes: cartItem.notes || null,
    offline: true,
  };
}

export function pendingOrderToKitchenOrder(pendingOrder, storeTables = []) {
  const { payload, localTokenNo, createdAt, id, type, status: syncStatus } =
    pendingOrder;
  const table = storeTables.find(
    (entry) => String(entry.id) === String(payload.tableId),
  );

  return {
    id,
    offline: true,
    offlineSyncStatus: syncStatus,
    date: createdAt,
    delivery_type: payload.deliveryType,
    customer_type: payload.customerType,
    customer_id: payload.customer?.phone || payload.customer?.id || null,
    customer_name: payload.customer?.name || null,
    table_id: payload.tableId || null,
    table_title: table?.title || null,
    floor: table?.floor || null,
    status: "created",
    payment_status: type === "order_and_invoice" ? "paid" : "pending",
    token_no: localTokenNo,
    items: (payload.cart || []).map((item, index) =>
      cartItemToOrderItem(item, id, index, createdAt),
    ),
  };
}

export function pendingOrdersToOrderGroups(pendingOrders, storeTables = []) {
  const groups = new Map();

  for (const pendingOrder of pendingOrders) {
    const order = pendingOrderToKitchenOrder(pendingOrder, storeTables);
    const groupKey = order.table_id ? `table-${order.table_id}` : "walkin";

    if (!groups.has(groupKey)) {
      groups.set(groupKey, {
        table_id: order.table_id,
        table_title: order.table_title,
        floor: order.floor,
        orders: [],
        order_ids: [],
        offline: true,
      });
    }

    const group = groups.get(groupKey);
    group.orders.push({
      id: pendingOrder.id,
      date: pendingOrder.createdAt,
      delivery_type: order.delivery_type,
      customer_type: order.customer_type,
      customer_id: order.customer_id,
      customer_name: order.customer_name,
      status: "created",
      payment_status: order.payment_status,
      token_no: order.token_no,
      items: order.items,
      offline: true,
      offlineSyncStatus: pendingOrder.status,
    });
    group.order_ids.push(pendingOrder.id);
  }

  return Array.from(groups.values());
}

export async function getActiveOfflineKitchenOrders(tenantId) {
  if (!tenantId) return [];

  const [pendingOrders, cache] = await Promise.all([
    getPendingOrders(tenantId),
    getPosCache(tenantId),
  ]);

  const storeTables = cache?.data?.storeTables || [];
  const activeOrders = pendingOrders.filter((order) =>
    ACTIVE_SYNC_STATUSES.has(order.status),
  );

  return activeOrders.map((order) =>
    pendingOrderToKitchenOrder(order, storeTables),
  );
}

export async function getActiveOfflineOrderGroups(tenantId) {
  if (!tenantId) return [];

  const [pendingOrders, cache] = await Promise.all([
    getPendingOrders(tenantId),
    getPosCache(tenantId),
  ]);

  const storeTables = cache?.data?.storeTables || [];
  const activeOrders = pendingOrders.filter((order) =>
    ACTIVE_SYNC_STATUSES.has(order.status),
  );

  return pendingOrdersToOrderGroups(activeOrders, storeTables);
}

export async function getOfflineOrdersInit(tenantId) {
  const cache = await getPosCache(tenantId);
  return cache?.data || null;
}
