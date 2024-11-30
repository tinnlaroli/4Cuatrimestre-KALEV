// **Modelo (studentModel.js)**
const { pool } = require('../config/dbConfig');

// Obtener todos los estudiantes
const obtenerEstudiantes = async () => {
    const query = 'SELECT * FROM Estudiantes';
    const { rows } = await pool.query(query);
    return rows;
};

// Obtener un estudiante por ID
const obtenerEstudiantePorId = async (id) => {
    const query = 'SELECT * FROM Estudiantes WHERE id_estudiante = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
};

// Registrar un nuevo estudiante
const registrarEstudiante = async (nombre, correo, claseId) => {
    const query = `
        INSERT INTO Estudiantes (nombre, correo, id_clase)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const { rows } = await pool.query(query, [nombre, correo, claseId]);
    return rows[0];
};

// Actualizar un estudiante
const actualizarEstudiante = async (id, nombre, correo, claseId) => {
    const query = `
        UPDATE Estudiantes
        SET nombre = $1, correo = $2, id_clase = $3
        WHERE id_estudiante = $4
        RETURNING *;
    `;
    const { rows } = await pool.query(query, [nombre, correo, claseId, id]);
    return rows[0];
};

// Eliminar un estudiante
const eliminarEstudiante = async (id) => {
    const query = 'DELETE FROM Estudiantes WHERE id_estudiante = $1 RETURNING id_estudiante';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
};

module.exports = {
    obtenerEstudiantes,
    obtenerEstudiantePorId,
    registrarEstudiante,
    actualizarEstudiante,
    eliminarEstudiante
};