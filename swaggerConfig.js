const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
swaggerDefinition: {
    openapi: "3.0.0",
    info: {
    title: "API de KALEV",
    version: "1.0.0",
    description: "Documentación de la API para la plataforma KALEV",
    contact: {
        name: "Tu Nombre",
        email: "tuemail@example.com",
    },
    },
    servers: [
    {
        url: "http://localhost:3000",
        description: "Servidor de desarrollo",
    },
    ],
},
apis: ["./routes/*.js", "./controllers/*.js"], // Archivo de rutas y controladores
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };
