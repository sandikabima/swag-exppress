import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { getAll, getById, create, update, remove } from "./user.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Definisi konfigurasi Swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User API",
      version: "1.0",
      description: "OpenAPI for Users"
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

// Gunakan middleware Swagger UI untuk menampilkan dokumentasi API
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Daftarkan endpoint-endpoint API
app.get("/users", getAll);
app.get("/users/:id", getById);
app.post('/users', create);
app.put('/users/:id', update);
app.delete('/users/:id', remove);

app.get("/", (req, res) => {
  res.send("halo world");
});

app.listen(port, () => {
  console.log("Server running on port", port);
});