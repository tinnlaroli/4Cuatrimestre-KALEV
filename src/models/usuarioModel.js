const { pool } = require('../utils/db');

// Modelo para manejar la tabla `Usuarios`
const UsuarioModel = {
    // Crear un nuevo usuario
    crearUsuario: async ({ nombre, rol, correo, contraseñaHash }) => {
        const query = `
            INSERT INTO Usuarios (nombre, rol, correo, contraseña) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *;
        `;
        const values = [nombre, rol, correo, contraseñaHash];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    // Obtener todos los usuarios
    obtenerUsuarios: async () => {
        const query = `SELECT * FROM Usuarios`;
        const result = await pool.query(query);
        return result.rows;
    },

    // Obtener un usuario por ID
    obtenerUsuarioPorId: async (id) => {
        const query = `SELECT * FROM Usuarios WHERE id_usuario = $1`;
        const result = await pool.query(query, [id]);
        return result.rows[0];
    },

    // Obtener un usuario por correo
    obtenerUsuarioPorCorreo: async (correo) => {
        const query = `SELECT * FROM Usuarios WHERE correo = $1`;
        const result = await pool.query(query, [correo]);
        return result.rows[0];
    },

    // Actualizar un usuario
    actualizarUsuario: async ({ id, nombre, correo, rol, estado }) => {
        const query = `
            UPDATE Usuarios 
            SET nombre = $1, correo = $2, rol = $3, estado = $4 
            WHERE id_usuario = $5 
            RETURNING *;
        `;
        const values = [nombre, correo, rol, estado, id];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    // Eliminar un usuario
    eliminarUsuario: async (id) => {
        const query = `DELETE FROM Usuarios WHERE id_usuario = $1 RETURNING *`;
        const result = await pool.query(query, [id]);
        return result.rows[0];
    },

    // Cambiar la contraseña de un usuario
    cambiarContraseña: async ({ id, nuevaContraseñaHash }) => {
        const query = `
            UPDATE Usuarios 
            SET contraseña = $1 
            WHERE id_usuario = $2 
            RETURNING *;
        `;
        const values = [nuevaContraseñaHash, id];
        const result = await pool.query(query, values);
        return result.rows[0];
    },
};

module.exports = UsuarioModel;