const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
};

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     tags:
 *     - : 'Auth'
 *     summary: Creates a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              username:
 *                 type: string
 *                 description: Username
 *                 example: User1
 *              email:
 *                 type: string
 *                 description: users email
 *                 example: user@gmail.com
 *              phoneno:
 *                 type: integer
 *                 description: Users phone no and its an optional field
 *                 example: 9090909090
 *              password:
 *                 type: string
 *                 description: Users password
 *                 example: abc@1234
 *              roles:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: user
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: array
 *                   example: User was registered successfully!
 *       '500':
 *          description: Internal Server Error!
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: array
 *                    example: Internal Server Error!
 */

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     tags:
 *     - : 'Auth'
 *     summary: It returns user Id and access token if the user exist.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              email:
 *                 type: string
 *                 description: Users email which they used for signing up
 *                 example: user@gmail.com
 *              password:
 *                 type: string
 *                 description: Users password which they used while signing up
 *                 example: 123456
 *     responses:
 *        '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                username:
 *                   type: string
 *                   description: Username
 *                   example: User1
 *                email:
 *                   type: string
 *                   description: users email
 *                   example: user@gmail.com
 *                phoneno:
 *                  type: integer
 *                  description: Users phone no and its an optional field
 *                  example: 9090909090
 *                password:
 *                  type: string
 *                  description: Users password
 *                  example: abc@1234
 *                roles:
 *                  type: array
 *                  items:
 *                    type: string
 *                    example: user
 *                token:
 *                  type: string
 *                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZjkyOTQ5MmY3ZTYxZGYwNGM4YzVjOCIsImlhdCI6MTcxMTExMzUwMSwiZXhwIjoxNzExMTk5OTAxfQ.xbP9xWGZnfhoBzjyD9fEG_yTsR8fUjygyGIPLB-4BrU
 *
 */
