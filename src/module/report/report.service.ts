import { AppDataSource } from "../../config/data-source";
import { InventoryTurnoverResponse } from "./report.dto";

const getInventoryTurnover = async (startDate: string, endDate: string) => {
  const query = `
    SELECT p.id AS productId,
           SUM(CASE WHEN i.stockType = 'stock_in' THEN i.quantity ELSE 0 END) AS totalIn,
           SUM(CASE WHEN i.stockType = 'stock_out' THEN i.quantity ELSE 0 END) AS totalOut
    FROM inventory i
    JOIN product p ON i.productId = p.id
    WHERE i.createdAt BETWEEN :startDate AND :endDate
    GROUP BY p.id
  `;

  const result = await AppDataSource.query(query, [startDate, endDate]);
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

const ReportService = {
  getInventoryTurnover,
};

export default ReportService;
