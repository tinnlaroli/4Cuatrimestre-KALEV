// swagger/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Opciones para Swagger
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'KALEV API',
            version: '1.0.0',
            description: 'Documentación de la API para KALEV',
        },
    },
    apis: ['./routes/*.js'], // Apuntar a los archivos de rutas para generar la documentación
};

// Crear el especificación Swagger
const specs = swaggerJsdoc(options);

// Configurar el endpoint de Swagger
const swaggerSetup = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

module.exports = swaggerSetup;
