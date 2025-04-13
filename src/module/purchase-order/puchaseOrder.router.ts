import { asyncHandler } from "./../../middleware/asyncHandle.middleware";
import { Router } from "express";
import PurchaseOrderController from "./puchaseOrder.contrroller";
import { validateRequest } from "../../middleware/validate.middleware";
import {
  ApprovalPoRequest,
  CreatePORequest,
  SubmitPoRequest,
} from "./puchaseOrder.dto";

const poRouter = Router();

poRouter.post(
  "/createPurchaseOrder",
  validateRequest(CreatePORequest),
  asyncHandler(PurchaseOrderController.createPurchaseOrder)
);
poRouter.get(
  "/getListPurchaseOrder",
  asyncHandler(PurchaseOrderController.getListPurchaseOrder)
);
poRouter.patch(
  "/submitPurchaseOrder/:purchaseOrderId",
  asyncHandler(PurchaseOrderController.submitPurchaseOrder)
);

poRouter.patch(
  "/approvePurchaseOrder/:purchaseOrderId",
  validateRequest(ApprovalPoRequest),
  asyncHandler(PurchaseOrderController.approvePurchaseOrder)
);

export default poRouter;
