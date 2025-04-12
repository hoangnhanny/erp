export type Role = "procurement" | "manager" | "inventory" | "finance";

export const accessControl: Record<string, string[]> = {
  "POST /api/purchase-order/createPurchaseOrder": ["procurement", "manager"],
  "POST /purchase-orders/approvePurchaseOrder/:purchaseOrderId": [
    "manager",
    "finance",
  ],
  "POST /inventory/receivePurchaseOrder": ["inventory"],
  "GET /purchase-orders/view-finance": ["finance", "manager"],
};
