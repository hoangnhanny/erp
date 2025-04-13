import { Repository } from "typeorm";
import { AppDataSource } from "../../config/data-source";
import { AuditLog } from "../../entities/AuditLogs";

const auditRepository: Repository<AuditLog> =
  AppDataSource.getRepository(AuditLog);
const createAudit = async (data: AuditLogsRequest) => {
  const auditLog = new AuditLog();
  auditLog.userId = data.userId;
  auditLog.entityId = data.entityId;
  auditLog.action = data.action;
  auditLog.entityType = data.entityType;
  auditLog.changes = data.changes;
  await auditRepository.save(auditLog);
};

const searchAuditLogs = async (dataSearch: any): Promise<AuditLog[]> => {
  const { userId, action, entityType } = dataSearch;
  console.log("dataSearch", dataSearch);
  const query = AppDataSource.createQueryBuilder(AuditLog, "auditLog");

  if (userId) {
    query.andWhere("auditLog.userId = :userId", { userId });
  }
  if (action) {
    query.andWhere("auditLog.action = :action", { action });
  }
  if (entityType) {
    query.andWhere("lower(auditLog.entityType) = :entityType", {
      entityType: entityType.toLowerCase(),
    });
  }

  return await query.getMany();

  // If needed, you can add pagination or sorting here
};

const AuditLogService = {
  createAudit,
  searchAuditLogs,
};

export default AuditLogService;
