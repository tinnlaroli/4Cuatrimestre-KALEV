const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Opciones de configuración para Swagger
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "KALEV API",
      description: "Documentación de la API para el proyecto KALEV",
      version: "1.0.0",
    },
    securityDefinitions: {
      BearerAuth: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description:
          "Introduce el token JWT en el encabezado Authorization (Bearer <token>)",
      },
    },
    servers: [
      {
        url: "https://api-appkalev.up.railway.app",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

// Inicializa Swagger
const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Función para configurar Swagger en tu aplicación
const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // Rutas para acceder a la documentación Swagger
};

module.exports = setupSwagger;
