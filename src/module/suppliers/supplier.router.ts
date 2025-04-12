import express from "express";
import { asyncHandler } from "../../middleware/asyncHandle.middleware";
import SupplierController from "./supplier.controller";
import { validateRequest } from "../../middleware/validate.middleware";
import { CreateSupplierRequest } from "./supplier.dto";

const supplierRouter = express.Router();

supplierRouter.post(
  "/createSupplier",
  validateRequest(CreateSupplierRequest),
  asyncHandler(SupplierController.createSupplier)
);
supplierRouter.get(
  "/getListSupplier",
  asyncHandler(SupplierController.getListSupplier)
);

export default supplierRouter;
