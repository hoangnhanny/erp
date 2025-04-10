import express from "express";
import { asyncHandler } from "../../middleware/asyncHandle.middleware";
import SupplierController from "./supplier.controller";

const supplierRouter = express.Router();

supplierRouter.post(
  "/createSupplier",
  asyncHandler(SupplierController.createSupplier)
);
supplierRouter.get(
  "/getListSupplier",
  asyncHandler(SupplierController.getListSupplier)
);

export default supplierRouter;
