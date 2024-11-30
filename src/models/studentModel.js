const { pool } = require('../config/dbConfig');

// Obtener todos los estudiantes
const obtenerEstudiantes = async () => {
    const query = 'SELECT * FROM estudiantes';
    try {
        const { rows } = await pool.query(query);
        return rows;
    } catch (error) {
        console.error('Error al obtener estudiantes:', error);
        throw new Error('Error al obtener estudiantes');
    }
};

// Obtener un estudiante por ID
const obtenerEstudiantePorId = async (id) => {
    const query = 'SELECT * FROM estudiantes WHERE id_estudiante = $1';
    try {
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    } catch (error) {
        console.error('Error al obtener estudiante por ID:', error);
        throw new Error('Error al obtener estudiante por ID');
    }
};

// Registrar un nuevo estudiante
const registrarEstudiante = async (nombre, correo, claseId) => {
    const query = `
        INSERT INTO estudiantes (nombre, correo, id_clase)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    try {
        const { rows } = await pool.query(query, [nombre, correo, claseId]);
        return rows[0];
    } catch (error) {
        console.error('Error al registrar estudiante:', error);
        throw new Error('Error al registrar estudiante');
    }
};

// Actualizar un estudiante
const actualizarEstudiante = async (id, nombre, correo, claseId) => {
    const query = `
        UPDATE estudiantes
        SET nombre = $1, correo = $2, id_clase = $3
        WHERE id_estudiante = $4
        RETURNING *;
    `;
    try {
        const { rows } = await pool.query(query, [nombre, correo, claseId, id]);
        return rows[0];
    } catch (error) {
        console.error('Error al actualizar estudiante:', error);
        throw new Error('Error al actualizar estudiante');
    }
};

// Eliminar un estudiante
const eliminarEstudiante = async (id) => {
    const query = 'DELETE FROM estudiantes WHERE id_estudiante = $1 RETURNING id_estudiante';
    try {
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    } catch (error) {
        console.error('Error al eliminar estudiante:', error);
        throw new Error('Error al eliminar estudiante');
    }
};

module.exports = {
    obtenerEstudiantes,
    obtenerEstudiantePorId,
    registrarEstudiante,
    actualizarEstudiante,
    eliminarEstudiante,
};
