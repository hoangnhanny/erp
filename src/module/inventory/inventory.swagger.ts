/**
 * @swagger
 * /api/inventory/receivePurchaseOrder:
 *   post:
 *     summary: Mark a purchase order as received and update inventory
 *     tags: [Inventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - relatedPoId
 *               - performedBy
 *             properties:
 *               relatedPoId:
 *                 type: string
 *                 format: uuid
 *                 example: "po-uuid-123456"
 *               performedBy:
 *                 type: string
 *                 format: uuid
 *                 example: "user-uuid-789"
 *               note:
 *                 type: string
 *                 example: "Received all items in good condition"
 *     responses:
 *       200:
 *         description: Purchase order received*
 */
