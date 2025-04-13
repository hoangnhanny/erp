import AuditLogService from "./auditLogs.service";

import { Request, Response } from "express";

const searchAuditLogs = async (req: Request, res: Response) => {
  try {
    const auditLogs = await AuditLogService.searchAuditLogs({
      userId: req.query?.userId ?? null,
      action: req.query?.action ?? null,
      entityType: req.query?.entityType ?? null,
    });
    return {
      status: 200,
      message: "Audit logs retrieved successfully",
      data: auditLogs,
    };
  } catch (error) {
    return {
      status: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
    };
  }
};

const AuditLogController = {
  searchAuditLogs,
};
export default AuditLogController;
