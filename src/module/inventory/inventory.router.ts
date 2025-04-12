import express from "express";
import { validateRequest } from "../../middleware/validate.middleware";
import { ReceivedPurchaseOrderRequest } from "./inventory.dto";
import InventoryController from "./inventory.controller";
import { asyncHandler } from "../../middleware/asyncHandle.middleware";

const inventoryRouter = express.Router();

inventoryRouter.post(
  "/receivedPurchaseOrder",
  validateRequest(ReceivedPurchaseOrderRequest),
  asyncHandler(InventoryController.receivedPurchaseOrder)
);

export default inventoryRouter;
