export type Role = "procurement" | "manager" | "inventory" | "finance";

export const accessControl: Record<string, string[]> = {
  "POST /api/purchase-order/createPurchaseOrder": ["procurement", "manager"],
  "POST /purchase-orders/approvePurchaseOrder/:purchaseOrderId": [
    "manager",
    "finance",
  ],
  "POST /api/inventory/receivePurchaseOrder": ["inventory"],
  "GET /api/report/supplier-spending": ["finance", "manager"],
  "GET /api/report/inventory-turnover": ["finance", "manager"],
};
