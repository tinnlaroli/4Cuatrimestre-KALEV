const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Variable de entorno para la conexión
    ssl: {
        rejectUnauthorized: false, // Necesario para servicios de nube como Railway
    },
});

module.exports = { pool };

