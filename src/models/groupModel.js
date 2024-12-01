const { pool } = require('../config/dbConfig'); // Configuración de la base de datos PostgreSQL

/**
 * Registra un nuevo grupo en la base de datos.
 */
const registrarGrupo = async (nombreGrupo, codigoUnico, idDocente, idDirector, grado) => {
    const query = `
        INSERT INTO grupos (nombre_grupo, codigo_unico, id_docente, id_director, grado)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
    const values = [nombreGrupo, codigoUnico, idDocente, idDirector, grado];
    console.log('Valores para la consulta SQL:', values);

    try {
        const { rows } = await pool.query(query, values);
        return rows[0];
    } catch (error) {
        console.error('Error en la consulta SQL para registrar grupo:', error.message);
        throw error;
    }
};

/**
 * Obtiene todos los grupos asociados a un docente específico.
 */
const obtenerGruposPorDocente = async (idDocente) => {
    const query = `
        SELECT * FROM grupos
        WHERE id_docente = $1;
    `;
    try {
        const { rows } = await pool.query(query, [idDocente]);
        return rows;
    } catch (error) {
        console.error('Error al obtener grupos por docente:', error.message);
        throw error;
    }
};

/**
 * Obtiene un grupo por su ID.
 */
const obtenerGrupoPorId = async (idGrupo) => {
    const query = `
        SELECT * FROM grupos
        WHERE id_grupo = $1;
    `;
    try {
        const { rows } = await pool.query(query, [idGrupo]);
        return rows[0];
    } catch (error) {
        console.error('Error al obtener grupo por ID:', error.message);
        throw error;
    }
};

/**
 * Actualiza los detalles de un grupo.
 */
const actualizarGrupo = async (idGrupo, nombreGrupo, codigoUnico, grado) => {
    const query = `
        UPDATE grupos
        SET nombre_grupo = $1, codigo_unico = $2, grado = $3
        WHERE id_grupo = $4
        RETURNING *;
    `;
    try {
        const { rows } = await pool.query(query, [nombreGrupo, codigoUnico, grado, idGrupo]);
        return rows[0];
    } catch (error) {
        console.error('Error al actualizar grupo:', error.message);
        throw error;
    }
};

/**
 * Elimina un grupo por su ID.
 */
const eliminarGrupo = async (idGrupo) => {
    const query = `
        DELETE FROM grupos
        WHERE id_grupo = $1
        RETURNING *;
    `;
    try {
        const { rows } = await pool.query(query, [idGrupo]);
        if (rows.length === 0) {
            throw new Error('Grupo no encontrado');
        }
    } catch (error) {
        console.error('Error al eliminar grupo:', error.message);
        throw error;
    }
};

module.exports = {
    registrarGrupo,
    obtenerGruposPorDocente,
    obtenerGrupoPorId,
    actualizarGrupo,
    eliminarGrupo,
};
