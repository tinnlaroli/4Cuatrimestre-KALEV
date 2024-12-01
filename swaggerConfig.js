    const swaggerJSDoc = require("swagger-jsdoc");
    const swaggerUi = require("swagger-ui-express");

    // Determinar el entorno y configurar el servidor correspondiente
    const SERVER_URL = process.env.API_URL || "https://kalev.up.railway.app";

    const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
        title: "API de KALEV",
        version: "1.0.0",
        description: "Documentación completa de la API para la plataforma KALEV.",
        termsOfService: `${SERVER_URL}/terms`,
        contact: {
            name: "Equipo de KALEV",
            email: "contacto@kalev.com",
            url: `${SERVER_URL}`,
        },
        license: {
            name: "MIT",
            url: "https://opensource.org/licenses/MIT",
        },
        },
        servers: [
        {
            url: SERVER_URL,
            description: "Servidor actual (Railway)",
        },
        {
            url: "http://localhost:3000",
            description: "Servidor de desarrollo local",
        },
        ],
        components: {
        securitySchemes: {
            BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
            },
        },
        },
        security: [
        {
            BearerAuth: [],
        },
        ],
    },
    apis: [
        "./src/routes/*.js", // Todas las rutas
        "./src/controllers/*.js", // Controladores con Swagger (si se requiere)
    ],
    };

    const swaggerSpec = swaggerJSDoc(options);

    module.exports = { swaggerUi, swaggerSpec };
