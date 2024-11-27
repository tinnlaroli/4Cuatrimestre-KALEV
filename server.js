const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const { Pool } = require('pg');
const setupSwagger = require('./swagger/swagger');

// Cargar variables de entorno
dotenv.config();

// Obtener la URL de la base de datos desde la variable de entorno
const { DB_URL, PG_PASSWORD } = process.env;

// Verificar que la variable de entorno se haya cargado correctamente
console.log('Conectando a la base de datos con los siguientes parámetros:');
console.log(`DB_URL: ${DB_URL}`);
console.log('Tipo de DB_URL:', typeof DB_URL);
console.log('Contenido de DB_URL:', DB_URL);

// Verificar la contraseña cargada desde .env
console.log('Contraseña de la base de datos desde .env:', PG_PASSWORD);
console.log('Tipo de PG_PASSWORD:', typeof PG_PASSWORD);

// Conexión a la base de datos PostgreSQL usando la URL y parámetros
const pool = new Pool({
    connectionString: DB_URL,
    ssl: {
        rejectUnauthorized: false
    }
});


// Conexión a la base de datos
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

module.exports = { pool }; // Exportamos el pool de conexiones para que esté disponible en otros archivos
