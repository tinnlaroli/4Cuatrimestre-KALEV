// **Modelo (styleModel.js)**
const { pool } = require('../config/dbConfig');

/**
 * Obtiene todos los estilos de aprendizaje registrados.
 */
const obtenerEstilos = async () => {
    const query = 'SELECT * FROM EstilosDeAprendizaje;';
    const { rows } = await pool.query(query);
    return rows;
};

/**
 * Obtiene un estilo de aprendizaje por su ID.
 */
const obtenerEstiloPorId = async (id) => {
    const query = 'SELECT * FROM EstilosDeAprendizaje WHERE id_estilo = $1;';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
};

/**
 * Crea un nuevo estilo de aprendizaje.
 */
const crearEstilo = async (nombre, descripcion) => {
    const query = `
        INSERT INTO EstilosDeAprendizaje (nombre, descripcion)
        VALUES ($1, $2)
        RETURNING *;
    `;
    const { rows } = await pool.query(query, [nombre, descripcion]);
    return rows[0];
};

/**
 * Actualiza un estilo de aprendizaje existente.
 */
const actualizarEstilo = async (id, nombre, descripcion) => {
    const query = `
        UPDATE EstilosDeAprendizaje
        SET nombre = $1, descripcion = $2
        WHERE id_estilo = $3
        RETURNING *;
    `;
    const { rows } = await pool.query(query, [nombre, descripcion, id]);
    return rows[0];
};

/**
 * Elimina un estilo de aprendizaje por su ID.
 */
const eliminarEstilo = async (id) => {
    const query = 'DELETE FROM EstilosDeAprendizaje WHERE id_estilo = $1 RETURNING id_estilo;';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
};

module.exports = {
    obtenerEstilos,
    obtenerEstiloPorId,
    crearEstilo,
    actualizarEstilo,
    eliminarEstilo,
};