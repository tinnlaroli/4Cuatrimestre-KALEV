const { pool } = require('../config/dbConfig'); // Configuración de la base de datos PostgreSQL

/**
 * Registra un nuevo grupo en la base de datos.
 * @param {string} nombreGrupo - Nombre del grupo.
 * @param {string} codigoUnico - Código único del grupo.
 * @param {number} idDocente - ID del docente que crea el grupo.
 * @param {number} idDirector - ID del director asociado al grupo.
 * @param {string} grado - Grado del grupo.
 * @returns {Promise<Object>} - Grupo registrado.
 */
const registrarGrupo = async (nombreGrupo, codigoUnico, idDocente, idDirector, grado) => {
    const query = `
        INSERT INTO grupos (nombre_grupo, codigo_unico, id_docente, id_director, grado)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
    const values = [nombreGrupo, codigoUnico, idDocente, idDirector, grado];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

/**
 * Obtiene todos los grupos asociados a un docente específico.
 * @param {number} idDocente - ID del docente.
 * @returns {Promise<Array>} - Lista de grupos.
 */
const obtenerGruposPorDocente = async (idDocente) => {
    const query = `
        SELECT * FROM grupos
        WHERE id_docente = $1;
    `;
    const { rows } = await pool.query(query, [idDocente]);
    return rows;
};

/**
 * Obtiene un grupo por su ID.
 * @param {number} idGrupo - ID del grupo.
 * @returns {Promise<Object>} - Detalle del grupo.
 */
const obtenerGrupoPorId = async (idGrupo) => {
    const query = `
        SELECT * FROM grupos
        WHERE id_grupo = $1;
    `;
    const { rows } = await pool.query(query, [idGrupo]);
    return rows[0];
};

/**
 * Actualiza los detalles de un grupo.
 * @param {number} idGrupo - ID del grupo.
 * @param {string} nombreGrupo - Nuevo nombre del grupo.
 * @param {string} codigoUnico - Nuevo código único del grupo.
 * @param {string} grado - Nuevo grado del grupo.
 * @returns {Promise<Object>} - Grupo actualizado.
 */
const actualizarGrupo = async (idGrupo, nombreGrupo, codigoUnico, grado) => {
    const query = `
        UPDATE grupos
        SET nombre_grupo = $1, codigo_unico = $2, grado = $3
        WHERE id_grupo = $4
        RETURNING *;
    `;
    const { rows } = await pool.query(query, [nombreGrupo, codigoUnico, grado, idGrupo]);
    return rows[0];
};

/**
 * Elimina un grupo por su ID.
 * @param {number} idGrupo - ID del grupo.
 * @returns {Promise<void>} - Confirmación de eliminación.
 */
const eliminarGrupo = async (idGrupo) => {
    const query = `
        DELETE FROM grupos
        WHERE id_grupo = $1
        RETURNING *;
    `;
    const { rows } = await pool.query(query, [idGrupo]);
    if (rows.length === 0) {
        throw new Error('Grupo no encontrado');
    }
};

module.exports = {
    registrarGrupo,
    obtenerGruposPorDocente,
    obtenerGrupoPorId,
    actualizarGrupo,
    eliminarGrupo
};
