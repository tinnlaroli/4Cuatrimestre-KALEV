const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const setupSwagger = require('./swagger/swagger');

// Inicialización de la aplicación
dotenv.config(); // Carga las variables de entorno desde el archivo .env
const app = express();

// Importar la conexión a la base de datos
const { pool } = require('./src/utils/db');

// Middlewares globales
app.use(express.json()); // Procesar datos en formato JSON
app.use(cors());         // Habilitar CORS para solicitudes entre dominios
setupSwagger(app);       // Configurar Swagger para la documentación de API

// Importar rutas
const usuariosRoutes = require('./src/routes/usuariosRoutes');
const clasesRoutes = require('./src/routes/clasesRoutes');
const estudiantesRoutes = require('./src/routes/estudiantesRoutes');
const reporteRoutes = require('./src/routes/reporteRoutes');
const juegosRoutes = require('./src/routes/juegosRoutes');

// Rutas principales
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/clases', clasesRoutes);
app.use('/api/estudiantes', estudiantesRoutes);
app.use('/api/reportes', reporteRoutes);
app.use('/api/juegos', juegosRoutes);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack); // Loguear el error en la consola
    res.status(err.status || 500).json({
        error: true,
        message: err.message || 'Error interno del servidor.',
    });
});

// Puerto y arranque del servidor
const PORT = process.env.PORT || 5000; // Usa el puerto definido en .env o el 5000 por defecto
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});

// Exportar app y pool (opcional, para pruebas o usos externos)
module.exports = { app, pool };
