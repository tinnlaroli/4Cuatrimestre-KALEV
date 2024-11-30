// **Modelo (classModel.js)**
const db = require('../config/dbConfig'); // Configuración de la base de datos PostgreSQL

/**
 * Registra una nueva clase en la base de datos.
 * @param {string} nombre - Nombre de la clase.
 * @param {string} codigo - Código único de la clase.
 * @param {number} docenteId - ID del docente que crea la clase.
 * @returns {Promise<Object>} - Clase registrada.
 */
const registrarClase = async (nombre, codigo, docenteId) => {
    const query = `
        INSERT INTO clases (nombre, codigo, docente_id)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const values = [nombre, codigo, docenteId];
    const { rows } = await db.query(query, values);
    return rows[0];
};

/**
 * Obtiene todas las clases de un docente específico.
 * @param {number} docenteId - ID del docente.
 * @returns {Promise<Array>} - Lista de clases.
 */
const obtenerClases = async (docenteId) => {
    const query = `
        SELECT * FROM clases;
    `;
    const { rows } = await db.query(query, [docenteId]);
    return rows;
};

/**
 * Obtiene todas las clases de un docente específico.
 * @param {number} docenteId - ID del docente.
 * @returns {Promise<Array>} - Lista de clases.
 */
const obtenerClasesPorDocente = async (docenteId) => {
    const query = `
        SELECT * FROM clases
        WHERE docente_id = $1;
    `;
    const { rows } = await db.query(query, [docenteId]);
    return rows;
};

/**
 * Obtiene una clase por su ID.
 * @param {number} id - ID de la clase.
 * @returns {Promise<Object>} - Detalle de la clase.
 */
const obtenerClasePorId = async (id) => {
    const query = `
        SELECT * FROM clases
        WHERE id_clase = $1;
    `;
    const { rows } = await db.query(query, [id]);
    return rows[0];
};

/**
 * Actualiza los detalles de una clase.
 * @param {number} id - ID de la clase.
 * @param {string} nombre - Nuevo nombre de la clase.
 * @returns {Promise<Object>} - Clase actualizada.
 */
const actualizarClase = async (id, nombre) => {
    const query = `
        UPDATE clases
        SET nombre = $1
        WHERE id_clase = $2
        RETURNING *;
    `;
    const { rows } = await db.query(query, [nombre, id]);
    return rows[0];
};

/**
 * Elimina una clase por su ID.
 * @param {number} id - ID de la clase.
 * @returns {Promise<void>} - Confirmación de eliminación.
 */
const eliminarClase = async (id) => {
    const query = `
        DELETE FROM clases
        WHERE id_clase = $1;
    `;
    await db.query(query, [id]);
};

module.exports = {
    registrarClase,
    obtenerClases,
    obtenerClasesPorDocente,
    obtenerClasePorId,
    actualizarClase,
    eliminarClase
};
