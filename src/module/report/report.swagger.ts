/**
 * @swagger
 * /api/report/inventory-turnover:
 *   get:
 *     summary: Get inventory turnover report between two dates
 *     tags: [Report]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for the report (yyyy-mm-dd)
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for the report (yyyy-mm-dd)
 *     responses:
 *       200:
 *         description: Inventory turnover data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalTurnover:
 *                   type: number
 *                   example: 15.8
 *                 details:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       productId:
 *                         type: string
 *                         example: "product-123"
 *                       productName:
 *                         type: string
 *                         example: "Printer A4"
 *                       turnoverRate:
 *                         type: number
 */

/**
 * @swagger
 * /api/report/supplier-spending:
 *   get:
 *     summary: Get total spending by each supplier
 *     tags: [Report]
 *     responses:
 *       200:
 *         description: Successfully retrieved supplier spending data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   supplierId:
 *                     type: string
 *                     format: uuid
 *                     example: "123e4567-e89b-12d3-a456-426614174000"
 *                   supplierName:
 *                     type: string
 *                     example: "ABC Supply Co."
 *                   totalSpending:
 *                     type: number
 *                     example: 125000.5
 *       500:
 *         description: Internal server error
 */
