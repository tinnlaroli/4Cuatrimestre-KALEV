const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

// Configuración de la base de datos usando variables de entorno separadas
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

module.exports = { pool };
