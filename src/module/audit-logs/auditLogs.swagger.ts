/**
 * @swagger
 * /api/audit-logs/getAuditLogs:
 *   get:
 *     summary: Get audit logs with optional filters
 *     tags: [Audit Log]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: false
 *         schema:
 *           type: string
 *         description: ID of the user who performed the action
 *       - in: query
 *         name: action
 *         required: false
 *         schema:
 *           type: string
 *         description: Action performed (e.g., create, update, delete)
 *       - in: query
 *         name: entityType
 *         required: false
 *         schema:
 *           type: string
 *         description: Type of entity affected (e.g., product, user)
 *     responses:
 *       200:
 *         description: Audit logs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "log-uuid-123"
 *                   userId:
 *                     type: string
 *                     example: "user-uuid-456"
 *                   action:
 *                     type: string
 *                     example: "update"
 *                   entityType:
 *                     type: string
 *                     example: "product"
 *                   entityId:
 *                     type: string
 *                     example: "product-789"
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-04-10T14:30:00Z"
 *                   details:
 *                     type: object
 *                     description: Additional details of the action
 *       500:
 *         description: Internal server error
 */
