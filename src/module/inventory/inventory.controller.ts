import { Request } from "express";
import { ReceivedPurchaseOrderRequest } from "./inventory.dto";
import InventoryService from "./inventory.service";

const receivedPurchaseOrder = async (req: Request) => {
  try {
    // Logic to handle received purchase order

    const { purchaseOrderId } = req.params;
    const { userId } = req.user as Express.UserPayload;
    const { note } = req.body;

    const dataReceive: ReceivedPurchaseOrderRequest = {
      relatedPoId: purchaseOrderId,
      performedBy: userId,
      note: note,
    };

    // Call the service to handle the received purchase order
    const receivedOrder = await InventoryService.receivedPurchaseOrder(
      dataReceive
    );

    return {
      status: 200,
      message: "Purchase Order received successfully",
      data: receivedOrder,
    };
  } catch (error) {
    return {
      status: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
    };
  }
};

const InventoryController = {
  receivedPurchaseOrder,
};

export default InventoryController;
