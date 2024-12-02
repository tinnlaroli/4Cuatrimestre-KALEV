const { pool } = require('../config/dbConfig');

// Obtener todos los alumnos
const obtenerAlumnos = async () => {
    const query = 'SELECT * FROM alumnos';  // Cambié 'estudiantes' por 'alumnos'
    try {
        const { rows } = await pool.query(query);
        return rows;
    } catch (error) {
        console.error('Error al obtener alumnos:', error);
        throw new Error('Error al obtener alumnos');
    }
};

// Obtener un alumno por ID
const obtenerAlumnoPorId = async (id) => {
    const query = 'SELECT * FROM alumnos WHERE id_alumno = $1';  // Cambié 'estudiantes' por 'alumnos'
    try {
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    } catch (error) {
        console.error('Error al obtener alumno por ID:', error);
        throw new Error('Error al obtener alumno por ID');
    }
};

// Registrar un nuevo estudiante
const registrarAlumno = async (nombre, apellido, correo, id_grupo) => {
    const query = `
        INSERT INTO alumnos (nombre, apellido, correo, id_grupo)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
    try {
        const { rows } = await pool.query(query, [nombre, apellido, correo, id_grupo]);
        return rows[0];
    } catch (error) {
        console.error('Error al registrar estudiante:', error);
        throw new Error('Error al registrar estudiante');
    }
};


// Actualizar un alumno
const actualizarAlumno = async (id, nombre, correo, telefono, id_grupo) => {
    const query = `
        UPDATE alumnos
        SET nombre = $1, correo = $2, telefono = $3, id_grupo = $4
        WHERE id_alumno = $5
        RETURNING *;
    `;
    try {
        const { rows } = await pool.query(query, [nombre, correo, telefono, id_grupo, id]);
        return rows[0];
    } catch (error) {
        console.error('Error al actualizar alumno:', error);
        throw new Error('Error al actualizar alumno');
    }
};

// Eliminar un alumno
const eliminarAlumno = async (id) => {
    const query = 'DELETE FROM alumnos WHERE id_alumno = $1 RETURNING id_alumno';
    try {
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    } catch (error) {
        console.error('Error al eliminar alumno:', error);
        throw new Error('Error al eliminar alumno');
    }
};

module.exports = {
    obtenerAlumnos,
    obtenerAlumnoPorId,
    registrarAlumno,
    actualizarAlumno,
    eliminarAlumno,
};
