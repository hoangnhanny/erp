/**
 * @swagger
 * /api/inventory/receivePurchaseOrder:
 *   post:
 *     summary: Receive a purchase order and update inventory
 *     tags: [Inventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - relatedPoId
 *             properties:
 *               relatedPoId:
 *                 type: string
 *                 format: uuid
 *                 example: "b75c87ec-2bb0-4a12-9b8a-3dd1c8f8a72f"
 *               note:
 *                 type: string
 *                 example: "Products received in good condition"
 *     responses:
 *       200:
 *         description: Purchase order received successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Purchase order not found
 *       500:
 *         description: Internal server error
 */
