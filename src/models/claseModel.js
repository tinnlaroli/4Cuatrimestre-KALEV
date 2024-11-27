const { pool } = require('../utils/db');

const ClaseModel = {
  // Crear una nueva clase
  crearClase: async ({ nombre_clase, codigo_clase, id_docente }) => {
    const query = `
            INSERT INTO Clases (nombre_clase, codigo_clase, id_docente)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
    const values = [nombre_clase, codigo_clase, id_docente];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  // Obtener una clase por su código
  obtenerClasePorCodigo: async (codigo_clase) => {
    const query = "SELECT * FROM Clases WHERE codigo_clase = $1";
    const result = await pool.query(query, [codigo_clase]);
    return result.rows[0];
  },

  // Obtener todas las clases de un docente
  obtenerClasesPorDocente: async (id_docente) => {
    const query = "SELECT * FROM Clases WHERE id_docente = $1";
    const result = await pool.query(query, [id_docente]);
    return result.rows;
  },

  // Obtener todas las clases
  obtenerTodasLasClases: async () => {
    const query = "SELECT * FROM Clases";
    const result = await pool.query(query);
    return result.rows;
  },
};

module.exports = ClaseModel;