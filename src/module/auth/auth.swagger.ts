/**
 * @swagger
 *  /auth/login:
 *    post:
 *      summary: Login user
 *      description: Authenticate user with email and password and return a JWT token
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  example: "manager@gmail.com"
 *                password:
 *                  type: string
 *                  example: "manager"
 *      responses:
 *        200:
 *          description: Successful login, returns user object with token
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  user:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: string
 *                      email:
 *                        type: string
 *                  token:
 *                    type: string
 *                    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ...1NDA4Vg"
 *        401:
 *          description: Unauthorized
 *        500:
 *          description: Internal Server Error
 */

/**
 * @swagger
 *  /auth/registerUser:
 *    post:
 *     summary: Create a new user
 *     tags: [Auth]
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
 *                 example: admin
 *               password:
 *                 type: string
 *                 example: admin
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
