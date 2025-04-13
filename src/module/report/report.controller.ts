import { Request } from "express";
import ReportService from "./report.service";

const getInventoryTurnover = async (req: Request) => {
  try {
    const { startDate, endDate } = req.query;
    const inventoryTurnover = await ReportService.getInventoryTurnover(
      startDate as string,
      endDate as string
    );
    return {
      status: 200,
      message: "Inventory turnover retrieved successfully",
      data: inventoryTurnover,
    };
  } catch (error) {
    return {
      status: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
    };
  }
};

const getSupplierSpending = async (req: Request) => {
  try {
    const supplierSpending = await ReportService.getSupplierSpending();
    return {
      status: 200,
      message: "Supplier spending retrieved successfully",
      data: supplierSpending,
    };
  } catch (error) {
    return {
      status: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
    };
  }
};

const ReportController = {
  getInventoryTurnover,
  getSupplierSpending,
};

export default ReportController;
