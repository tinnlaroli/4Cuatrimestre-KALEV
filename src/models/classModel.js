const pool = require('../config/dbConfig'); // Configuración de la base de datos PostgreSQL

/**
 * Registra una nueva clase en la base de datos.
 * @param {string} nombre - Nombre de la clase.
 * @param {string} codigo - Código único de la clase.
 * @param {number} docenteId - ID del docente que crea la clase.
 * @returns {Promise<Object>} - Clase registrada.
 */
const registrarClase = async (nombre, codigo, docenteId) => {
    const query = `
        INSERT INTO clases (nombre, codigo, docente_id)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const values = [nombre, codigo, docenteId];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

/**
 * Obtener las clases asignadas al docente autenticado
 * @param {Object} req - La solicitud HTTP
 * @param {Object} res - La respuesta HTTP
 */
const obtenerClases = async (req, res) => {
    const id_docente = req.usuario.id_usuario; // Este ID debería venir de la autenticación o token

    try {
        const clases = await obtenerClasesPorDocente(id_docente);
        if (clases.length === 0) {
            return res.status(404).json({ message: 'No se encontraron clases para este docente' });
        }
        res.status(200).json({ clases });
    } catch (error) {
        console.error('Error al obtener las clases:', error);
        res.status(500).json({ message: 'Error al obtener las clases' });
    }
};

/**
 * Obtiene todas las clases de un docente específico.
 * @param {number} docenteId - ID del docente.
 * @returns {Promise<Array>} - Lista de clases.
 */
const obtenerClasesPorDocente = async (docenteId) => {
    const query = `
        SELECT * FROM clases
        WHERE docente_id = $1;
    `;
    const { rows } = await pool.query(query, [docenteId]);
    return rows;
};

/**
 * Obtiene una clase por su ID.
 * @param {number} id - ID de la clase.
 * @returns {Promise<Object>} - Detalle de la clase.
 */
const obtenerClasePorId = async (id) => {
    const query = `
        SELECT * FROM clases
        WHERE id_clase = $1;
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
};

/**
 * Actualiza los detalles de una clase.
 * @param {number} id - ID de la clase.
 * @param {string} nombre - Nuevo nombre de la clase.
 * @param {string} descripcion - Nueva descripción de la clase.
 * @param {string} codigo - Nuevo código de la clase.
 * @returns {Promise<Object>} - Clase actualizada.
 */
const actualizarClase = async (id, nombre, descripcion, codigo) => {
    const query = `
        UPDATE clases
        SET nombre = $1, descripcion = $2, codigo = $3
        WHERE id_clase = $4
        RETURNING *;
    `;
    const { rows } = await pool.query(query, [nombre, descripcion, codigo, id]);
    return rows[0];
};

/**
 * Elimina una clase por su ID.
 * @param {number} id - ID de la clase.
 * @returns {Promise<void>} - Confirmación de eliminación.
 */
const eliminarClase = async (id) => {
    const query = `
        DELETE FROM clases
        WHERE id_clase = $1
        RETURNING *;
    `;
    const { rows } = await pool.query(query, [id]);
    if (rows.length === 0) {
        throw new Error('Clase no encontrada');
    }
};

module.exports = {
    registrarClase,
    obtenerClases,
    obtenerClasesPorDocente,
    obtenerClasePorId,
    actualizarClase,
    eliminarClase
};
