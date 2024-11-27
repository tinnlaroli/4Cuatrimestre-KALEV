const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.connect()
    .then(() => {
        console.log('Conexión exitosa');
        pool.end();
    })
    .catch((err) => {
        console.error('Error al conectar:', err.stack);
    });
