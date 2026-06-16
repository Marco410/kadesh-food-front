export function getCustomerTypeLabel(t, type) {
  if (!type) return "";
  if (type === "WALKIN") return t("print_receipt.customer_walkin");
  if (type === "CUSTOMER") return t("print_receipt.customer_registered");
  return type;
}

export function getDeliveryTypeLabel(t, type) {
  if (!type) return "";
  const key = String(type).toLowerCase();
  if (["dinein", "delivery", "takeaway"].includes(key)) {
    return t(`pos.${key}`);
  }
  return type;
}

export function formatOrderContextLabel(
  t,
  { deliveryType, customerType, customerName, tableTitle, tableId } = {},
) {
  if (tableId && tableTitle) return tableTitle;
  if (customerType === "CUSTOMER" && customerName) return customerName;

  const delivery = getDeliveryTypeLabel(t, deliveryType);
  if (delivery) return delivery;

  return getCustomerTypeLabel(t, customerType);
}
