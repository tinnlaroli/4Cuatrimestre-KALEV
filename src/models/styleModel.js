const { pool } = require('../config/dbConfig');

// Obtener todos los estilos de aprendizaje
const obtenerEstilos = async () => {
    const query = 'SELECT * FROM estilosdeaprendizaje;';
    try {
        const { rows } = await pool.query(query);
        return rows;
    } catch (error) {
        console.error('Error al obtener estilos de aprendizaje:', error);
        throw new Error('Error al obtener estilos de aprendizaje');
    }
};

// Obtener un estilo de aprendizaje por ID
const obtenerEstiloPorId = async (id) => {
    const query = 'SELECT * FROM estilosdeaprendizaje WHERE id_estilo = $1;';
    try {
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    } catch (error) {
        console.error('Error al obtener estilo de aprendizaje por ID:', error);
        throw new Error('Error al obtener estilo de aprendizaje por ID');
    }
};

// Crear un nuevo estilo de aprendizaje
const crearEstilo = async (nombre, descripcion) => {
    const query = `
        INSERT INTO estilosdeaprendizaje (nombre, descripcion)
        VALUES ($1, $2)
        RETURNING *;
    `;
    try {
        const { rows } = await pool.query(query, [nombre, descripcion]);
        return rows[0];
    } catch (error) {
        console.error('Error al crear estilo de aprendizaje:', error);
        throw new Error('Error al crear estilo de aprendizaje');
    }
};

// Actualizar un estilo de aprendizaje
const actualizarEstilo = async (id, nombre, descripcion) => {
    const query = `
        UPDATE estilosdeaprendizaje
        SET nombre = $1, descripcion = $2
        WHERE id_estilo = $3
        RETURNING *;
    `;
    try {
        const { rows } = await pool.query(query, [nombre, descripcion, id]);
        return rows[0];
    } catch (error) {
        console.error('Error al actualizar estilo de aprendizaje:', error);
        throw new Error('Error al actualizar estilo de aprendizaje');
    }
};

// Eliminar un estilo de aprendizaje
const eliminarEstilo = async (id) => {
    const query = 'DELETE FROM estilosdeaprendizaje WHERE id_estilo = $1 RETURNING id_estilo;';
    try {
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    } catch (error) {
        console.error('Error al eliminar estilo de aprendizaje:', error);
        throw new Error('Error al eliminar estilo de aprendizaje');
    }
};

module.exports = {
    obtenerEstilos,
    obtenerEstiloPorId,
    crearEstilo,
    actualizarEstilo,
    eliminarEstilo,
};
