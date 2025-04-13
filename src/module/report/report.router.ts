import { asyncHandler } from "../../middleware/asyncHandle.middleware";
import ReportController from "./report.controller";

const reportRouter = require("express").Router();

reportRouter.get(
  "/inventory-turnover",
  asyncHandler(ReportController.getInventoryTurnover)
);

reportRouter.get(
  "/supplier-spending",
  asyncHandler(ReportController.getSupplierSpending)
);

export default reportRouter;
