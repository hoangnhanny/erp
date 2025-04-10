import { Repository } from "typeorm";
import { PurchaseOrder } from "../../entities/PuchaseOrders";
import { AppDataSource } from "../../config/data-source";

const purchaseOrder: Repository<PurchaseOrder> =
  AppDataSource.getRepository(PurchaseOrder);

const createPO = async (data: any) => {
  try {
    console.log("Creating Purchase Order with data:", data);
    // Here you would typically save the PO to the database
    return { success: true, message: "Purchase Order created successfully" };
  } catch (error) {
    throw new Error("Failed to create Purchase Order");
  }
};

export const PurchaseOrderService = {
  createPO,
};
