const { pool } = require('../config/dbConfig');

// Función para obtener todas las actividades
const obtenerActividades = async () => {
    const query = `
        SELECT * FROM actividades_academicas;
    `;
    const { rows } = await pool.query(query);
    return rows;
};

// Función para agregar una nueva actividad
const agregarActividad = async (actividadData) => {
    const query = `
        INSERT INTO actividades_academicas (nombre_actividad, descripcion, fecha_inicio, fecha_fin, id_grupo, estilo_asociado)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
    `;
    const { rows } = await pool.query(query, [
        actividadData.nombre_actividad,
        actividadData.descripcion,
        actividadData.fecha_inicio,
        actividadData.fecha_fin,
        actividadData.id_grupo,
        actividadData.estilo_asociado,
    ]);
    return rows[0];
};

// Función para actualizar una actividad existente
const actualizarActividad = async (id, actividadData) => {
    const query = `
        UPDATE actividades_academicas
        SET nombre_actividad = $1, descripcion = $2, fecha_inicio = $3, fecha_fin = $4, id_grupo = $5, estilo_asociado = $6
        WHERE id_actividad = $7
        RETURNING *;
    `;
    const { rows } = await pool.query(query, [
        actividadData.nombre_actividad,
        actividadData.descripcion,
        actividadData.fecha_inicio,
        actividadData.fecha_fin,
        actividadData.id_grupo,
        actividadData.estilo_asociado,
        id
    ]);
    return rows[0];
};

// Función para eliminar una actividad
const eliminarActividad = async (id) => {
    const query = `
        DELETE FROM actividades_academicas WHERE id_actividad = $1 RETURNING *;
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
};

module.exports = {
    obtenerActividades,
    agregarActividad,
    actualizarActividad,
    eliminarActividad,
};
