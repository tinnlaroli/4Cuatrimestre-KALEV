const db = require('../config/dbConfig');

/**
 * Obtiene el feedback de un docente sobre la efectividad de una estrategia de enseñanza.
 * @param {number} id - ID del feedback.
 * @returns {Promise<Object>} - Información del feedback.
 */
const obtenerFeedback = async (id) => {
    const query = `
        SELECT * FROM feedback_estrategias
        WHERE id_feedback = $1;
    `;
    const { rows } = await db.query(query, [id]);
    return rows[0];
};

/**
 * Inserta un nuevo feedback en la base de datos.
 * @param {number} docenteId - ID del docente que envía el feedback.
 * @param {number} estrategiaId - ID de la estrategia de enseñanza.
 * @param {string} comentario - Comentario del docente.
 * @param {number} efectividad - Calificación de efectividad de la estrategia.
 * @returns {Promise<Object>} - Feedback insertado.
 */
const enviarFeedback = async (docenteId, estrategiaId, comentario, efectividad) => {
    const query = `
        INSERT INTO feedback_estrategias (id_estrategia, id_docente, efectividad, comentario, fecha_registro)
        VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
        RETURNING *;
    `;
    const values = [estrategiaId, docenteId, efectividad, comentario];
    const { rows } = await db.query(query, values);
    return rows[0];
};

/**
 * Obtiene el historial de acciones importantes.
 * @returns {Promise<Array>} - Historial de acciones.
 */
const obtenerHistorial = async () => {
    const query = `
        SELECT * FROM historial
        ORDER BY fecha DESC;
    `;
    const { rows } = await db.query(query);
    return rows;
};

module.exports = {
    obtenerFeedback,
    enviarFeedback,
    obtenerHistorial,
};
