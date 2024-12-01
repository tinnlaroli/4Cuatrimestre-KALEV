const { pool } = require('../config/dbConfig');

// Obtener usuario por ID
const obtenerUsuarioPorId = async (id) => {
    const query = `
        SELECT id_usuario, nombre_usuario AS nombre, correo, id_rol AS role
        FROM usuarios
        WHERE id_usuario = $1;
    `;
    try {
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        throw new Error('Error al obtener usuario por ID.');
    }
};

// Registrar un nuevo usuario
const registrarUsuario = async (nombre, correo, contrasena, role) => {
    const query = `
        INSERT INTO usuarios (nombre_usuario, correo, contrasena, id_rol)
        VALUES ($1, $2, $3, $4)
        RETURNING id_usuario, nombre_usuario AS nombre, correo, id_rol AS role;
    `;
    try {
        const { rows } = await pool.query(query, [nombre, correo, contrasena, role]);
        return rows[0];
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        throw new Error('Error al registrar usuario.');
    }
};


// Autenticar usuario por correo
const autenticarUsuario = async (correo) => {
    const query = `
        SELECT id_usuario, nombre_usuario AS nombre, correo, contrasena, id_rol AS role
        FROM usuarios
        WHERE correo = $1;
    `;
    try {
        const { rows } = await pool.query(query, [correo]);
        return rows[0];
    } catch (error) {
        console.error('Error al autenticar usuario:', error);
        throw new Error('Error al autenticar usuario.');
    }
};

// Actualizar usuario
const actualizarUsuario = async (id, nombre, correo, role) => {
    const query = `
        UPDATE usuarios
        SET nombre_usuario = $1, correo = $2, id_rol = $3
        WHERE id_usuario = $4
        RETURNING id_usuario, nombre_usuario AS nombre, correo, id_rol AS role;
    `;
    try {
        const { rows } = await pool.query(query, [nombre, correo, role, id]);
        return rows[0];
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        throw new Error('Error al actualizar usuario.');
    }
};

// Eliminar usuario
const eliminarUsuario = async (id) => {
    const query = `
        DELETE FROM usuarios
        WHERE id_usuario = $1
        RETURNING id_usuario;
    `;
    try {
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        throw new Error('Error al eliminar usuario.');
    }
};

module.exports = {
    obtenerUsuarioPorId,
    registrarUsuario,
    autenticarUsuario,
    actualizarUsuario,
    eliminarUsuario,
};
