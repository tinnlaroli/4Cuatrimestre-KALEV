const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const setupSwagger = require('./swagger/swagger');

// Cargar variables de entorno
dotenv.config();

// Importar la conexión a la base de datos
const { pool } = require('./src/utils/db');

// Middleware
app.use(express.json()); // Para procesar los datos en formato JSON
app.use(cors());         // Habilitar CORS para las solicitudes entre dominios
setupSwagger(app);       // Configura Swagger en la aplicación

// Rutas
const usuariosRoutes = require('./src/routes/usuariosRoutes');
const clasesRoutes = require('./src/routes/clasesRoutes');
const estudiantesRoutes = require('./src/routes/estudiantesRoutes');
const reporteRoutes = require('./src/routes/reporte');
const juegosRoutes = require('./src/routes/juegosRoutes');

// Middleware global
app.use((req, res, next) => {
    next();
});

// Rutas para usuarios y clases
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/clases', clasesRoutes);
app.use('/api/estudiantes', estudiantesRoutes);
app.use('/api', reporteRoutes);
app.use('/api', juegosRoutes);

// Puerto y arranque
const PORT = process.env.PORT || 5000; // Usa el puerto definido en .env o el 5000 por defecto
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = { pool }; // Exportamos el pool de conexiones si se necesita en otros archivos
