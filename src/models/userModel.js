const { pool } = require('../config/dbConfig');

// Obtener usuario por ID
const obtenerUsuarioPorId = async (id) => {
    const query = `
        SELECT id_usuario, nombre_usuario AS nombre, correo, id_rol AS role
        FROM public.usuarios
        WHERE id_usuario = $1;
    `;
    try {
        const { rows } = await pool.query(query, [id]);
        if (rows.length === 0) {
            throw new Error('Usuario no encontrado.');
        }
        return rows[0];
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error.message);
        throw new Error('Error al obtener usuario por ID.');
    }
};

// Registrar un nuevo usuario
const registrarUsuario = async (nombre, correo, contrasena, role) => {
    const query = `
        INSERT INTO public.usuarios (nombre_usuario, correo, contrasena, id_rol)
        VALUES ($1, $2, $3, $4)
        RETURNING id_usuario, nombre_usuario AS nombre, correo, id_rol AS role;
    `;
    try {
        const { rows } = await pool.query(query, [nombre, correo, contrasena, role]);
        return rows[0];
    } catch (error) {
        console.error('Error al registrar usuario:', error.message);
        throw new Error('Error al registrar usuario. Verifica los datos proporcionados.');
    }
};

// Autenticar usuario por correo
const autenticarUsuario = async (correo) => {
    const query = `
        SELECT id_usuario, nombre_usuario AS nombre, correo, contrasena, id_rol AS role
        FROM public.usuarios
        WHERE correo = $1;
    `;
    try {
        const { rows } = await pool.query(query, [correo]);
        if (rows.length === 0) {
            return null; // Usuario no encontrado
        }
        return rows[0];
    } catch (error) {
        console.error('Error al autenticar usuario:', error.message);
        throw new Error('Error al autenticar usuario.');
    }
};

// Actualizar usuario
const actualizarUsuario = async (id, nombre, correo, role) => {
    const query = `
        UPDATE public.usuarios
        SET nombre_usuario = $1, correo = $2, id_rol = $3
        WHERE id_usuario = $4
        RETURNING id_usuario, nombre_usuario AS nombre, correo, id_rol AS role;
    `;
    try {
        const { rows } = await pool.query(query, [nombre, correo, role, id]);
        if (rows.length === 0) {
            throw new Error('Usuario no encontrado para actualizar.');
        }
        return rows[0];
    } catch (error) {
        console.error('Error al actualizar usuario:', error.message);
        throw new Error('Error al actualizar usuario.');
    }
};

// Eliminar usuario
const eliminarUsuario = async (id) => {
    const query = `
        DELETE FROM public.usuarios
        WHERE id_usuario = $1
        RETURNING id_usuario;
    `;
    try {
        const { rows } = await pool.query(query, [id]);
        if (rows.length === 0) {
            throw new Error('Usuario no encontrado para eliminar.');
        }
        return rows[0];
    } catch (error) {
        console.error('Error al eliminar usuario:', error.message);
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
