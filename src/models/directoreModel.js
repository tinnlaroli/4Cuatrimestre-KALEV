const { pool } = require('../utils/db');// Asegúrate de tener configurada tu conexión a la base de datos

const DirectorModel = {
    // Crear un nuevo director
    crearDirector: async ({ nombre, apellido, correo, telefono }) => {
        const query = `
            INSERT INTO directores (nombre, apellido, correo, telefono)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const values = [nombre, apellido, correo, telefono];

        try {
            const { rows } = await db.query(query, values);
            return rows[0];
        } catch (error) {
            console.error('Error al crear director:', error);
            throw error;
        }
    },

    // Obtener todos los directores
    obtenerDirectores: async () => {
        const query = `
            SELECT * FROM directores
            ORDER BY id_director;
        `;

        try {
            const { rows } = await db.query(query);
            return rows;
        } catch (error) {
            console.error('Error al obtener directores:', error);
            throw error;
        }
    },

    // Obtener un director por su ID
    obtenerDirectorPorId: async (id_director) => {
        const query = `
            SELECT * FROM directores
            WHERE id_director = $1;
        `;

        try {
            const { rows } = await db.query(query, [id_director]);
            return rows[0];
        } catch (error) {
            console.error('Error al obtener director por ID:', error);
            throw error;
        }
    },

    // Modificar un director
    modificarDirector: async (id_director, { nombre, apellido, correo, telefono }) => {
        const query = `
            UPDATE directores
            SET
                nombre = COALESCE($1, nombre),
                apellido = COALESCE($2, apellido),
                correo = COALESCE($3, correo),
                telefono = COALESCE($4, telefono)
            WHERE id_director = $5
            RETURNING *;
        `;
        const values = [nombre, apellido, correo, telefono, id_director];

        try {
            const { rows } = await db.query(query, values);
            return rows[0];
        } catch (error) {
            console.error('Error al modificar director:', error);
            throw error;
        }
    },

    // Eliminar un director
    eliminarDirector: async (id_director) => {
        const query = `
            DELETE FROM directores
            WHERE id_director = $1
            RETURNING *;
        `;

        try {
            const { rows } = await db.query(query, [id_director]);
            return rows[0];
        } catch (error) {
            console.error('Error al eliminar director:', error);
            throw error;
        }
    }
};

module.exports = DirectorModel;