/**
 * @swagger
 * /api/purchase-order/createPurchaseOrder:
 *   post:
 *     summary: Create a new purchase order
 *     tags: [Purchase Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - supplierId
 *               - items
 *             properties:
 *               supplierId:
 *                 type: string
 *                 example: 'supplier-123'
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - productId
 *                     - quantity
 *                     - unitPrice
 *                   properties:
 *                     productId:
 *                       type: string
 *                       example: 'product-789'
 *                     quantity:
 *                       type: number
 *                       example: 10
 *                     unitPrice:
 *                       type: number
 *                       example: 199.99
 *     responses:
 *       201:
 *         description: Purchase order created successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/purchase-order/getListPurchaseOrder:
 *   get:
 *     summary: Get list of purchase orders
 *     tags: [Purchase Order]
 *
 *     responses:
 *       200:
 *         description: List of purchase orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "po-uuid-123"
 *                   supplierName:
 *                     type: string
 *                     example: "ABC Supplies Co."
 *                   status:
 *                     type: string
 *                     example: "approved"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-04-10T10:30:00Z"
 *                   totalAmount:
 *                     type: number
 *                     example: 150000.0
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/purchase-order/submitPurchaseOrder/{purchaseOrderId}:
 *   patch:
 *     summary: Submit a draft purchase order for review
 *     tags: [Purchase Order]
 *     parameters:
 *       - in: path
 *         name: purchaseOrderId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the purchase order to submit
 *     responses:
 *       200:
 *         description: Purchase order submitted successfully
 *       404:
 *         description: Purchase order not found
 *       400:
 *         description: Invalid request or PO not in draft state
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/purchase-order/approvePurchaseOrder/{purchaseOrderId}:
 *   patch:
 *     summary: Approve a purchase order
 *     tags: [Purchase Order]
 *     parameters:
 *       - in: path
 *         name: purchaseOrderId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the purchase order to approve
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 example: "Approved for next step"
 *     responses:
 *       200:
 *         description: Purchase order approved successfully
 *       400:
 *         description: Invalid request or already approved
 *       404:
 *         description: Purchase order not found
 *       500:
 *         description: Internal server error
 */
