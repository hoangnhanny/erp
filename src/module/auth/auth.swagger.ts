/**
    * @swagger
    * path:
    *  /login:
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
    *                  example: "user@example.com"
    *                password:
    *                  type: string
    *                  example: "password123"
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