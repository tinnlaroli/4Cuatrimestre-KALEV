const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const setupSwagger = require('./swagger/swagger');

// Inicialización de la aplicación
dotenv.config();
const app = express();

// Importar la conexión a la base de datos
const { pool } = require('./src/utils/db');

// Configuración de CORS
app.use(cors({
    origin: ['http://localhost:3000', 'https://api-appkalev.up.railway.app/'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

// Middlewares globales
app.use(express.json());
setupSwagger(app);

// Importar rutas
const usuariosRoutes = require('./src/routes/usuariosRoutes');
const clasesRoutes = require('./src/routes/clasesRoutes');
const estudiantesRoutes = require('./src/routes/estudiantesRoutes');
const reporteRoutes = require('./src/routes/reporte');
const juegosRoutes = require('./src/routes/juegosRoutes');
const docentesDirectoresRoutes = require('./src/routes/docentesdirectoresRoutes');

// Rutas principales
app.use('/usuarios', usuariosRoutes);
app.use('/clases', clasesRoutes);
app.use('/estudiantes', estudiantesRoutes);
app.use('/reportes', reporteRoutes);
app.use('/juegos', juegosRoutes);
app.use('docentesdirectores', docentesdirectoresRoutes);
////////////PARA ACOSTA SIN SWGAGGER NI NADA CAEWN
app.use('/api', docentesDirectoresRoutes);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);

    if (err.status === 404) {
        return res.status(404).json({
            error: true,
            message: 'Recurso no encontrado.',
        });
    }

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            error: true,
            message: 'Error de validación: ' + err.message,
        });
    }

    res.status(err.status || 500).json({
        error: true,
        message: err.message || 'Error interno del servidor.',
    });
});

// Puerto y arranque del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});

module.exports = { app, pool };
