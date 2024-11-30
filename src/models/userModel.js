const { pool } = require('../config/dbConfig');

const obtenerUsuarioPorId = async (id) => {
    const query = `
        SELECT id_usuario, nombre, correo, role
        FROM Usuarios
        WHERE id_usuario = $1;
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
};

const registrarUsuario = async (nombre, correo, password, role) => {
    const query = `
        INSERT INTO Usuarios (nombre, correo, password, role)
        VALUES ($1, $2, $3, $4)
        RETURNING id_usuario, nombre, correo, role;
    `;
    const { rows } = await pool.query(query, [nombre, correo, password, role]);
    return rows[0];
};

const autenticarUsuario = async (correo) => {
    const query = `
        SELECT id_usuario, nombre, correo, password, role
        FROM Usuarios
        WHERE correo = $1;
    `;
    const { rows } = await pool.query(query, [correo]);
    return rows[0];
};

const actualizarUsuario = async (id, nombre, correo, role) => {
    const query = `
        UPDATE Usuarios
        SET nombre = $1, correo = $2, role = $3
        WHERE id_usuario = $4
        RETURNING id_usuario, nombre, correo, role;
    `;
    const { rows } = await pool.query(query, [nombre, correo, role, id]);
    return rows[0];
};

const eliminarUsuario = async (id) => {
    const query = `
        DELETE FROM Usuarios
        WHERE id_usuario = $1
        RETURNING id_usuario;
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
};

module.exports = {
    obtenerUsuarioPorId,
    registrarUsuario,
    autenticarUsuario,
    actualizarUsuario,
    eliminarUsuario,
};
