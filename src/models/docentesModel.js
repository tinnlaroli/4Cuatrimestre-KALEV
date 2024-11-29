const { pool } = require('../utils/db');// Asegúrate de tener configurada tu conexión a la base de datos

const DocenteModel = {
    // Crear un nuevo docente
    crearDocente: async ({ nombre, apellido, correo, telefono, especialidad, fecha_registro }) => {
        const query = `
            INSERT INTO docentes (nombre, apellido, correo, telefono, especialidad, fecha_registro)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;
        const values = [nombre, apellido, correo, telefono, especialidad, fecha_registro];
        const { rows } = await db.query(query, values);
        return rows[0];
    },

    // Obtener todos los docentes
    obtenerDocentes: async () => {
        const query = `SELECT * FROM docentes ORDER BY id_docente;`;
        const { rows } = await db.query(query);
        return rows;
    },

    // Obtener un docente por su ID
    obtenerDocentePorId: async (id_docente) => {
        const query = `SELECT * FROM docentes WHERE id_docente = $1;`;
        const { rows } = await db.query(query, [id_docente]);
        return rows[0];
    },

    // Modificar un docente
    modificarDocente: async (id_docente, { nombre, apellido, correo, telefono, especialidad }) => {
        const query = `
            UPDATE docentes
            SET nombre = COALESCE($1, nombre),
                apellido = COALESCE($2, apellido),
                correo = COALESCE($3, correo),
                telefono = COALESCE($4, telefono),
                especialidad = COALESCE($5, especialidad)
            WHERE id_docente = $6
            RETURNING *;
        `;
        const values = [nombre, apellido, correo, telefono, especialidad, id_docente];
        const { rows } = await db.query(query, values);
        return rows[0];
    },

    // Eliminar un docente
    eliminarDocente: async (id_docente) => {
        const query = `DELETE FROM docentes WHERE id_docente = $1 RETURNING *;`;
        const { rows } = await db.query(query, [id_docente]);
        return rows[0];
    }
};

module.exports = DocenteModel;