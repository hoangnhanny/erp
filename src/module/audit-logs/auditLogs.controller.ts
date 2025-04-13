import AuditLogService from "./auditLogs.service";

import { Request, Response } from "express";

const searchAuditLogs = async (req: Request, res: Response) => {
  try {
    const auditLogs = await AuditLogService.searchAuditLogs({
      userId: req.query?.userId ?? null,
      action: req.query?.action ?? null,
      entityType: req.query?.entityType ?? null,
    });
    return res.status(200).json({
      status: 200,
      message: "Audit logs retrieved successfully",
      data: auditLogs,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

const AuditLogController = {
  searchAuditLogs,
};
export default AuditLogController;
