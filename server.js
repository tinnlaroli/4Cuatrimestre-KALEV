const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const { Pool } = require('pg');
const setupSwagger = require('./swagger/swagger'); // Importa la configuración de Swagger

// Cargar variables de entorno
dotenv.config();

// Obtener las variables de entorno
const { DB_USER, DB_HOST, DB_DATABASE, DB_PASSWORD, DB_PORT } = process.env;

// Verificar que las variables de entorno se hayan cargado correctamente
console.log('Conectando a la base de datos con los siguientes parámetros:');
console.log(`DB_USER: ${DB_USER}, DB_HOST: ${DB_HOST}, DB_DATABASE: ${DB_DATABASE}, DB_PORT: ${DB_PORT}`);

// Conexión a la base de datos PostgreSQL
const pool = new Pool({
    user: DB_USER,            // Usuario de la base de datos
    host: DB_HOST,            // Dirección del servidor de la base de datos
    database: DB_DATABASE,    // Nombre de la base de datos
    password: DB_PASSWORD,    // Contraseña del usuario de la base de datos
    port: DB_PORT,            // Puerto en el que PostgreSQL está escuchando
});

pool.connect()
    .then(() => {
        console.log('Conexión a la base de datos exitosa');
    })
    .catch((err) => {
        console.error('Error al conectar con la base de datos:', err.stack);
    });

// Middleware
app.use(express.json()); // Para procesar los datos en formato JSON
app.use(cors());         // Habilitar CORS para las solicitudes entre dominios

// Rutas
const usuariosRoutes = require('./src/routes/usuariosRoutes');
const clasesRoutes = require('./src/routes/clasesRoutes');
const estudiantesRoutes = require('./src/routes/estudiantesRoutes');

// Middleware global
app.use((req, res, next) => {
    next();
});

// Rutas para usuarios y clases
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/clases', clasesRoutes);
app.use('/api/estudiantes', estudiantesRoutes);

// Puerto y arranque
const PORT = process.env.PORT || 5000; // Usa el puerto definido en .env o el 5000 por defecto
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = { pool }; // Exportamos el pool de conexiones para que esté disponible en otros archivos
