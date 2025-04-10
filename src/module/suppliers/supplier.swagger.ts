/**
 * @swagger
 * /api/supplier/createSupplier:
 *   post:
 *     summary: Create a new supplier
 *     tags: [Supplier]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               email:
 *                type: string
 *                example: "demo@gmail.com"
 *               name:
 *                 type: string
 *                 example: demo
 *               creditLimit:
 *                 type: number
 *                 example: 123
 *     responses:
 *       201:
 *         description: Supplier created successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/supplier/listSupplier:
 *   get:
 *     summary: Get list of suppliers
 *     tags: [Supplier]
 *     responses:
 *       200:
 *         description: List of suppliers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 's1p2l3r4'
 *                   name:
 *                     type: string
 *                     example: 'ABC Supplies Ltd.'
 *                   email:
 *                     type: string
 *                     example: 'contact@abc-supplies.com'
 *                   phone:
 *                     type: string
 *                     example: '+84 123 456 789'
 *                   address:
 *                     type: string
 *                     example: '123 Nguyễn Văn Cừ, Quận 5, TP.HCM'
 *       500:
 *         description: Internal server error
 */
