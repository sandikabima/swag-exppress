import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { getAll, getById, create, update, remove } from "./user.js"

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User API",
      version: "1.0",
      description : "OpenAPI for Users"
    },

    components: {
      securitySchemes: {
        access_token: {
          type: 'http',
          scheme: 'bearer',
          description: 'Please input your JWT',
          bearerFormat: 'JWT'
        },
        basic: {
          type: 'http',
          scheme: 'basic'
        }
      }
    }
  },
  apis: ["./src/*.js"],
};

const swaggerDoc = swaggerJSDoc(options);
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - name
 *        - email
 *      properties:
 *        id:
 *          type: integer
 *          description: The auto-generated id of the user
 *        name:
 *          type: string
 *          description: The name of the user
 *        email:
 *          type: string
 *          format: email
 *          description: The email of the user
 *      example:
 *        id: 3
 *        name: user3
 *        email: user@gmail.com
 * 
 *    
 */

/**
 * @swagger
 * /users:
 *    get:
 *      summary: Get all users
 *      tags: [Users]
 *      responses:
 *        200:
 *          description: The list of all users
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/User'
 */


app.get("/users", getAll);



/**
 * @swagger
 * /users/{id}:
 *    get:
 *      summary: Get user by id
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The user id
 *      responses:
 *        '200':
 *          description: The user description by id
 *          content:
 *            application/json:
 *              schema:
 *                  $ref: '#/components/schemas/User'
 *        '404':
 *          description: User not found
 */

app.get("/users/:id", getById);


/**
 * @swagger
 * /users:
 *    post:
 *      summary: Create a new user
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        '200':
 *          description: The user was successfully created
 *          content:
 *            application/json:
 *              schema:
 *                  $ref: '#/components/schemas/User'
 *        '400':
 *          description: Invalid user data
 */

app.post('/users', create)


/**
 * @swagger
 * /users/{id}:
 *  put:
 *    summary: Update the user by the id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: the user id
 *    requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: the user was updated
 *        content: 
 *          application/json:
 *            schema:
 *             $ref: '#/components/schemas/User'
 *      404:
 *        description: The user was not found
 */


app.put('/users/:id', update)


/**
 * @swagger
 * /users/{id}:
 *    delete:
 *      summary: Remove the user by id
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The user id
 *      responses:
 *        '200':
 *          description: the user was deleted
 *        '404':
 *          description: the was user not found
 */


app.delete('/users/:id', remove)


app.get("/", (req, res) => {
  res.send("halo world");
});

app.listen(port, () => {
  console.log("Server running on port", port);
});