const { pool } = require('../utils/db');

const JuegoModel = {
    // Crear un nuevo juego
    crearJuego: async ({ nombre, descripcion, dificultad, tipo, clase_id }) => {
        const query = 'INSERT INTO juegos (nombre, descripcion, dificultad, tipo, clase_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [nombre, descripcion, dificultad, tipo, clase_id];
        
        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error("Error al crear el juego:", error);
            throw error;
        }
    },

    // Obtener todos los juegos
    obtenerJuegos: async () => {
        const query = 'SELECT * FROM juegos';
        
        try {
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            console.error("Error al obtener los juegos:", error);
            throw error;
        }
    },

    // Obtener un juego por su ID
    obtenerJuegoPorId: async (id_juego) => {
        const query = 'SELECT * FROM juegos WHERE id_juego = $1';
        const values = [id_juego];
        
        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error("Error al obtener el juego:", error);
            throw error;
        }
    },

    // Modificar un juego
    modificarJuego: async (id_juego, { nombre, descripcion, dificultad, tipo, clase_id }) => {
        const query = 'UPDATE juegos SET nombre = $1, descripcion = $2, dificultad = $3, tipo = $4, clase_id = $5 WHERE id_juego = $6 RETURNING *';
        const values = [nombre, descripcion, dificultad, tipo, clase_id, id_juego];
        
        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error("Error al modificar el juego:", error);
            throw error;
        }
    },

    // Eliminar un juego
    eliminarJuego: async (id_juego) => {
        const query = 'DELETE FROM juegos WHERE id_juego = $1 RETURNING *';
        const values = [id_juego];
        
        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error("Error al eliminar el juego:", error);
            throw error;
        }
    }
};

module.exports = JuegoModel;
