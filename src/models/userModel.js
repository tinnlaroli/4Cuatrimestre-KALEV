const { pool } = require('../config/dbConfig');

const obtenerUsuarioPorId = async (id) => {
    const query = `
        SELECT id_usuario, nombre, correo, role
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

const registrarUsuario = async (nombre, correo, password, role) => {
    const query = `
        INSERT INTO usuarios (nombre, correo, password, role)
        VALUES ($1, $2, $3, $4)
        RETURNING id_usuario, nombre, correo, role;
    `;
    try {
        const { rows } = await pool.query(query, [nombre, correo, password, role]);
        return rows[0];
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        throw new Error('Error al registrar usuario.');
    }
};

const autenticarUsuario = async (correo) => {
    const query = `
        SELECT id_usuario, nombre, correo, password, role
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

const actualizarUsuario = async (id, nombre, correo, role) => {
    const query = `
        UPDATE usuarios
        SET nombre = $1, correo = $2, role = $3
        WHERE id_usuario = $4
        RETURNING id_usuario, nombre, correo, role;
    `;
    try {
        const { rows } = await pool.query(query, [nombre, correo, role, id]);
        return rows[0];
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        throw new Error('Error al actualizar usuario.');
    }
};

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
