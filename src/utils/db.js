const dotenv = require('dotenv');
dotenv.config(); // Cargar las variables de entorno primero

const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = { pool };
