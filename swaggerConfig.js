const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Determinar el entorno y configurar el servidor correspondiente
const SERVER_URL = process.env.API_URL || "http://localhost:3000";

const options = {
swaggerDefinition: {
    openapi: "3.0.0",
    info: {
    title: "API de KALEV",
    version: "1.0.0",
    description: "Documentación completa de la API para la plataforma KALEV",
    termsOfService: "https://kalev.up.railway.app/terms",
    contact: {
        name: "Equipo de KALEV",
        email: "contacto@kalev.com",
        url: "https://kalev.up.railway.app",
    },
    license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
    },
    },
    servers: [
    {
        url: SERVER_URL,
        description: "Servidor actual",
    },
    {
        url: "http://localhost:3000",
        description: "Servidor de desarrollo",
    },
    ],
},
apis: [
    "./src/routes/*.js", // Todas las rutas
    "./src/controllers/*.js", // Controladores con Swagger
],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };
