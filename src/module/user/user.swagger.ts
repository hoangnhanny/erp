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
