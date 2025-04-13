import path from "path";
import fs from "fs/promises";
import { AppDataSource } from "../../config/data-source";
import {
  InventoryTransaction,
  Product,
  PurchaseOrder,
  Supplier,
} from "../../entities";

const getInventoryTurnover = async (startDate?: string, endDate?: string) => {
  const query = AppDataSource.createQueryBuilder(
    InventoryTransaction,
    "inventory"
  )
    .select("p.id", "productId")
    .addSelect(
      `SUM(CASE WHEN inventory.type = 'stock_in' THEN inventory.quantity ELSE 0 END)`,
      "totalIn"
    )
    .addSelect(
      `SUM(CASE WHEN inventory.type = 'stock_out' THEN inventory.quantity ELSE 0 END)`,
      "totalOut"
    )
    .leftJoin(Product, "p", "inventory.productId = p.id");

  if (startDate && endDate) {
    query.where("inventory.createdAt BETWEEN :startDate AND :endDate", {
      startDate,
      endDate,
    });
  } else if (startDate) {
    query.where("inventory.createdAt >= :startDate", { startDate });
  } else if (endDate) {
    query.where("inventory.createdAt <= :endDate", { endDate });
  }

  query.groupBy("p.id");

  return await query.getRawMany();
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

const generateReport = async () => {
  console.log("Generating report...!");
  try {
    const inventoryTurnover = await getInventoryTurnover();
    const supplierSpending = await getSupplierSpending();
    const filePath = path.join(__dirname, "../../reports-gen-json", "auto-report.json");
    await fs.writeFile(filePath, JSON.stringify({inventoryTurnover, supplierSpending }));
    return {
      inventoryTurnover,
      supplierSpending,
    };
  } catch (error) {
    console.error("Error generating report:", error);
  }
};

const ReportService = {
  getInventoryTurnover,
  getSupplierSpending,
  generateReport,
};

export default ReportService;
