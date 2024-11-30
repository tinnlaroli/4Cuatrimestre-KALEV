const { pool } = require('../config/dbConfig');

/**
 * Obtiene los datos de la clase por ID.
 * @param {number} idClase - ID de la clase.
 * @returns {Promise<Object>} - Datos de la clase.
 */
const obtenerDatosClase = async (idClase) => {
    const query = `
        SELECT c.nombre AS nombre_clase, d.nombre AS nombre_docente
        FROM clases c
        INNER JOIN docentes d ON c.docente_id = d.id_docente
        WHERE c.id_clase = $1;
    `;
    const { rows } = await pool.query(query, [idClase]);
    return rows[0];
};

/**
 * Obtiene la lista de estudiantes y su progreso en la clase.
 * @param {number} idClase - ID de la clase.
 * @returns {Promise<Array>} - Lista de estudiantes con su progreso.
 */
const obtenerEstudiantesClase = async (idClase) => {
    const query = `
        SELECT e.nombre AS nombre_estudiante, e.correo, r.progreso
        FROM estudiantes e
        INNER JOIN resultados_estilos r ON e.id_estudiante = r.id_alumno
        WHERE e.id_clase = $1;
    `;
    const { rows } = await pool.query(query, [idClase]);
    return rows;
};

module.exports = {
    obtenerDatosClase,
    obtenerEstudiantesClase,
};
