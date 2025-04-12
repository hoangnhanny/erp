/**
 * @swagger
 * /api/user/createUser:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - name
 *               - password
 *               - role
 *             properties:
 *               email:
 *                type: string
 *                example: 'procurement'
 *               name:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: mypassword123
 *               role:
 *                type: string
 *                enum:
 *                 - procurement
 *                 - manager
 *                 - inventory
 *                 - finance
 *                example: 'procurement'
 *     responses:
 *       201:
 *         description: User created successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user/getListUser:
 *   get:
 *     summary: Get list of users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 'u1234567'
 *                   name:
 *                     type: string
 *                     example: 'John Doe'
 *                   email:
 *                     type: string
 *                     example: 'john.doe@example.com'
 *                   role:
 *                     type: string
 *                     example: 'manager'
 *       500:
 *         description: Internal server error
 */
