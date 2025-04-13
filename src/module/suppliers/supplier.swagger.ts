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
 *               name:
 *                 type: string
 *                 example: demo
 *               email:
 *                 type: string
 *                 example: demo@gmail.com
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
 * /api/supplier/getListSupplier:
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
 *                   creditLimit:
 *                     type: number
 *                     example: 100000
 *       500:
 *         description: Internal server error
 */
