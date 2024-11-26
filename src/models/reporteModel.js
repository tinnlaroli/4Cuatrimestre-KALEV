const { pool } = require('../utils/db');

const obtenerDatosClase = async (id_clase) => {
    const query = `
        SELECT 
            c.nombre_clase, 
            u.nombre AS nombre_docente, 
            u.correo AS correo_docente
        FROM Clases c
        JOIN Usuarios u ON c.id_docente = u.id_usuario
        WHERE c.id_clase = $1;
    `;
    const { rows } = await pool.query(query, [id_clase]);
    console.log('Resultado de la consulta obtenerDatosClase:', rows);
    return rows[0];
};


const obtenerListaEstudiantes = async (id_clase) => {
    const query = `
        SELECT 
            u.nombre, 
            u.correo, 
            ea.nombre AS estilo_dominante
        FROM EstudiantesPorClase epc
        JOIN Usuarios u ON epc.id_estudiante = u.id_usuario
        JOIN ProgresoEstilosDeAprendizaje pe ON u.id_usuario = pe.id_estudiante
        JOIN EstilosDeAprendizaje ea ON pe.id_estilo = ea.id_estilo
        WHERE epc.id_clase = $1
        ORDER BY pe.nivel DESC;
    `;
    const { rows } = await pool.query(query, [id_clase]);
    return rows;
};

const obtenerProgresoIndividual = async (id_clase) => {
    const query = `
        SELECT 
            u.nombre AS nombre_estudiante, 
            COUNT(dp.id_desbloqueo) AS puertas_desbloqueadas, 
            COUNT(m.id_medalla) AS medallas_ganadas
        FROM Usuarios u
        LEFT JOIN DesbloqueoPuertas dp ON u.id_usuario = dp.id_estudiante
        LEFT JOIN Medallas m ON u.id_usuario = m.id_estudiante
        WHERE u.id_usuario IN (
            SELECT id_estudiante FROM EstudiantesPorClase WHERE id_clase = $1
        )
        GROUP BY u.nombre;
    `;
    const { rows } = await pool.query(query, [id_clase]);
    return rows;
};

module.exports = {
    obtenerDatosClase,
    obtenerListaEstudiantes,
    obtenerProgresoIndividual,
};
