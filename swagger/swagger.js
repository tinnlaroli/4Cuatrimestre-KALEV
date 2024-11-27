const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Opciones de configuración para Swagger con OpenAPI 3.0
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "KALEV API",
      description: "Documentación de la API para el proyecto KALEV",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
        description: "Servidor local de desarrollo",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description:
            "Introduce el token JWT en el encabezado Authorization (Bearer <token>)",
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Incluye las rutas que contienen anotaciones para Swagger
};

// Inicializa Swagger
const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Función para configurar Swagger en tu aplicación
const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // Rutas para acceder a la documentación Swagger
};

module.exports = setupSwagger;
