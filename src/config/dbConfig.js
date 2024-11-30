const { Pool } = require('pg');

// Crear un pool de conexión para la base de datos
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Requerido para conexiones seguras en Railway
  },
});

module.exports = pool;
