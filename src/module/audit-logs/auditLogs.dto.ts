interface AuditLogsRequest {
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  changes: Record<string, any>;
}

interface SearchAuditLogsRequest {
  userId?: string;
  action?: string;
  entityType?: string;
}
