export type Role = "procurement" | "manager" | "inventory" | "finance";

export const accessControl: Record<string, string[]> = {
  "POST /purchase-orders": ["admin", "manager"], // Tạo PO
  "POST /purchase-orders/approve": ["manager", "finance"], // Duyệt PO
  "POST /inventory/stock-in": ["inventory"], // Nhập kho
  "GET /purchase-orders/view-finance": ["finance"], // Xem tài chính
};
