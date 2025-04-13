import express from "express";
import { asyncHandler } from "../../middleware/asyncHandle.middleware";
import AuditLogController from "./auditLogs.controller";

const auditLogsRouter = express.Router();

auditLogsRouter.get(
  "/getAuditLogs",
  asyncHandler(AuditLogController.searchAuditLogs)
);

export default auditLogsRouter;
