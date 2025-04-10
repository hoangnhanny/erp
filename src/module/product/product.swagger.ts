/**
 * @swagger
 * /api/product/createProduct:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - sku
 *             properties:
 *               name:
 *                 type: string
 *                 example: 'iPhone 15'
 *               sku:
 *                 type: string
 *                 example: 'IPH15-256GB-BLK'
 *               category:
 *                 type: string
 *                 example: 'smartphone'
 *               unitPrice:
 *                 type: number
 *                 example: 999.99
 *               stock:
 *                 type: number
 *                 example: 50
 *               pendingStock:
 *                 type: number
 *                 example: 10
 *     responses:
 *       201:
 *         description: Product created successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/product/updateProduct:
 *   put:
 *     summary: Update an existing product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef'
 *               name:
 *                 type: string
 *                 example: 'iPhone 15 Pro'
 *               category:
 *                 type: string
 *                 example: 'smartphone'
 *               unitPrice:
 *                 type: number
 *                 example: 1199.99
 *               stock:
 *                 type: number
 *                 example: 40
 *               pendingStock:
 *                 type: number
 *                 example: 5
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/product/getListProduct:
 *   get:
 *     summary: Get list of products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 'a1b2c3d4'
 *                   name:
 *                     type: string
 *                     example: 'iPhone 15'
 *                   sku:
 *                     type: string
 *                     example: 'IPH15-256GB-BLK'
 *                   category:
 *                     type: string
 *                     example: 'smartphone'
 *                   unitPrice:
 *                     type: number
 *                     example: 999.99
 *                   stock:
 *                     type: number
 *                     example: 50
 *                   pendingStock:
 *                     type: number
 *                     example: 10
 *       500:
 *         description: Internal server error
 */
