const { pool } = require('../config/dbConfig');

const obtenerRecomendaciones = async () => {
    const query = `
        SELECT id_recomendacion, nombre, descripcion, estilo_aprendizaje
        FROM recomendaciones;
    `;
    const { rows } = await pool.query(query);
    return rows;
};

const obtenerRecomendacionPorId = async (id) => {
    const query = `
        SELECT id_recomendacion, nombre, descripcion, estilo_aprendizaje
        FROM recomendaciones
        WHERE id_recomendacion = $1;
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
};

const crearRecomendacion = async (nombre, descripcion, estilo_aprendizaje) => {
    const query = `
        INSERT INTO recomendaciones (nombre, descripcion, estilo_aprendizaje)
        VALUES ($1, $2, $3)
        RETURNING id_recomendacion, nombre, descripcion, estilo_aprendizaje;
    `;
    const { rows } = await pool.query(query, [nombre, descripcion, estilo_aprendizaje]);
    return rows[0];
};

const actualizarRecomendacion = async (id, nombre, descripcion, estilo_aprendizaje) => {
    const query = `
        UPDATE recomendaciones
        SET nombre = $1, descripcion = $2, estilo_aprendizaje = $3
        WHERE id_recomendacion = $4
        RETURNING id_recomendacion, nombre, descripcion, estilo_aprendizaje;
    `;
    const { rows } = await pool.query(query, [nombre, descripcion, estilo_aprendizaje, id]);
    return rows[0];
};

const eliminarRecomendacion = async (id) => {
    const query = `
        DELETE FROM recomendaciones
        WHERE id_recomendacion = $1
        RETURNING id_recomendacion;
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
};

module.exports = {
    obtenerRecomendaciones,
    obtenerRecomendacionPorId,
    crearRecomendacion,
    actualizarRecomendacion,
    eliminarRecomendacion,
};
