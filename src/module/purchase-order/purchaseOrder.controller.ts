import { ResponseData } from "../../type/response.type";
import { PurchaseOrderService } from "./purchaseOrder.service";
import { Request } from "express";
const createPurchaseOrder = async (req: Request) => {
  try {
    const purchaseOrder = await PurchaseOrderService.createPO({
      ...req.body,
      userId: req.user?.userId,
    });
    return {
      status: 201,
      message: "Purchase Order created successfully",
      data: purchaseOrder,
    };
  } catch (error) {
    return {
      status: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
    };
  }
};

const getListPurchaseOrder = async (req: Request) => {
  try {
    const purchaseOrders = await PurchaseOrderService.getListPurchaseOrder();

    console.log("purchaseOrders", purchaseOrders);
    return {
      status: 200,
      message: "Purchase Orders retrieved successfully",
      data: purchaseOrders,
    };
  } catch (error) {
    return {
      status: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
    };
  }
};

const submitPurchaseOrder = async (req: Request) => {
  const { purchaseOrderId } = req.params;
  const { userId } = req.user as Express.UserPayload;
  try {
    const purchaseOrder = await PurchaseOrderService.submitPurchaseOrder({
      id: purchaseOrderId,
      submitById: userId,
    });
    return {
      status: 200,
      message: "Purchase Order submitted successfully",
      data: purchaseOrder,
    };
  } catch (error) {
    return {
      status: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
    };
  }
};

const approvePurchaseOrder = async (
  req: Request
): Promise<ResponseData<null>> => {
  const { purchaseOrderId } = req.params;
  const { comment } = req.body;
  const { userId } = req.user as Express.UserPayload;
  try {
    await PurchaseOrderService.approvePurchaseOrder({
      id: purchaseOrderId,
      comment: comment,
      approverId: userId,
    });
    return {
      status: 200,
      message: "Purchase Order approved successfully",
    };
  } catch (error) {
    return {
      status: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
    };
  }
};

const PurchaseOrderController = {
  createPurchaseOrder,
  getListPurchaseOrder,
  submitPurchaseOrder,
  approvePurchaseOrder,
};

export default PurchaseOrderController;
