import { AppDataSource } from "../../config/data-source";
import {
  InventoryTransaction,
  Product,
  PurchaseOrder,
  Supplier,
} from "../../entities";
import { InventoryTurnoverResponse } from "./report.dto";

const getInventoryTurnover = async (startDate: string, endDate: string) => {
  const result = await AppDataSource.createQueryBuilder(
    InventoryTransaction,
    "i"
  )
    .select("p.id", "productId")
    .addSelect(
      `SUM(CASE WHEN i.type = 'stock_in' THEN i.quantity ELSE 0 END)`,
      "totalIn"
    )
    .addSelect(
      `SUM(CASE WHEN i.type = 'stock_out' THEN i.quantity ELSE 0 END)`,
      "totalOut"
    )
    .leftJoin(Product, "p", "i.productId = p.id")
    .where("i.createdAt BETWEEN :startDate AND :endDate", {
      startDate,
      endDate,
    })
    .groupBy("p.id")
    .getRawMany();

  if (result.length === 0) {
    return [];
  }
  const data: InventoryTurnoverResponse[] = result.map((item: any) => ({
    productId: item.productId,
    totalIn: parseInt(item.totalIn) || 0,
    totalOut: parseInt(item.totalOut) || 0,
    turnOverRate: parseInt(item.totalOut) / parseInt(item.totalIn),
  }));

  return data;
};

const getSupplierSpending = async () => {
  const report = await AppDataSource.createQueryBuilder(PurchaseOrder, "po")
    .select("s.id", "supplier_id")
    .addSelect("s.name", "supplier_name")
    .addSelect("TO_CHAR(po.created_at, 'YYYY-MM')", "month")
    .addSelect("COUNT(po.id)", "po_count")
    .addSelect("SUM(po.total_amount)", "total_spent")
    .addSelect("ROUND(AVG(po.total_amount), 2)", "average_po_value")
    .leftJoin(Supplier, "s", "po.supplier = s.id")
    .where("po.status = :status", { status: "approved" })
    .groupBy("s.id, s.name, TO_CHAR(po.created_at, 'YYYY-MM')")
    .orderBy("month", "DESC")
    .addOrderBy("total_spent", "DESC")
    .getRawMany();

  return report;
};

const ReportService = {
  getInventoryTurnover,
  getSupplierSpending,
};

export default ReportService;
