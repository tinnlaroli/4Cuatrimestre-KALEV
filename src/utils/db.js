const dotenv = require('dotenv');
dotenv.config(); // Cargar las variables de entorno primero

const { Pool } = require('pg');

// Verificar que las variables de entorno estén correctamente cargadas
if (!process.env.DB_URL) {
    console.log(process.env.DB_URL);
    throw new Error('DB_URL no está definida en las variables de entorno.');
}

const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Intentar la conexión a la base de datos para asegurar que todo esté bien
pool.connect()
    .then(() => console.log('Conexión a la base de datos exitosa'))
    .catch((err) => {
        console.error('Error al conectar con la base de datos:', err.stack);
        process.exit(1); // Salir si la conexión falla
    });

module.exports = { pool };
