const { pool } = require('../config/dbConfig');

const obtenerRecomendaciones = async () => {
    const query = `
        SELECT id_recomendacion, nombre, descripcion, estilo_aprendizaje
        FROM recomendaciones;
    `;
    try {
        const { rows } = await pool.query(query);
        return rows;
    } catch (error) {
        console.error('Error al obtener recomendaciones:', error);
        throw new Error('Error al obtener recomendaciones');
    }
};

const obtenerRecomendacionPorId = async (id) => {
    const query = `
        SELECT id_recomendacion, nombre, descripcion, estilo_aprendizaje
        FROM recomendaciones
        WHERE id_recomendacion = $1;
    `;
    try {
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    } catch (error) {
        console.error('Error al obtener recomendación por ID:', error);
        throw new Error('Error al obtener recomendación por ID');
    }
};

const crearRecomendacion = async (nombre, descripcion, estilo_aprendizaje) => {
    const query = `
        INSERT INTO recomendaciones (nombre, descripcion, estilo_aprendizaje)
        VALUES ($1, $2, $3)
        RETURNING id_recomendacion, nombre, descripcion, estilo_aprendizaje;
    `;
    try {
        const { rows } = await pool.query(query, [nombre, descripcion, estilo_aprendizaje]);
        return rows[0];
    } catch (error) {
        console.error('Error al crear recomendación:', error);
        throw new Error('Error al crear recomendación');
    }
};

const actualizarRecomendacion = async (id, nombre, descripcion, estilo_aprendizaje) => {
    const query = `
        UPDATE recomendaciones
        SET nombre = $1, descripcion = $2, estilo_aprendizaje = $3
        WHERE id_recomendacion = $4
        RETURNING id_recomendacion, nombre, descripcion, estilo_aprendizaje;
    `;
    try {
        const { rows } = await pool.query(query, [nombre, descripcion, estilo_aprendizaje, id]);
        return rows[0];
    } catch (error) {
        console.error('Error al actualizar recomendación:', error);
        throw new Error('Error al actualizar recomendación');
    }
};

const eliminarRecomendacion = async (id) => {
    const query = `
        DELETE FROM recomendaciones
        WHERE id_recomendacion = $1
        RETURNING id_recomendacion;
    `;
    try {
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    } catch (error) {
        console.error('Error al eliminar recomendación:', error);
        throw new Error('Error al eliminar recomendación');
    }
};

module.exports = {
    obtenerRecomendaciones,
    obtenerRecomendacionPorId,
    crearRecomendacion,
    actualizarRecomendacion,
    eliminarRecomendacion,
};
