const JuegoModel = require('../models/juegoModel'); // Asegúrate de tener este modelo

const juegosController = {
    // Crear un nuevo juego
    crearJuego: async (req, res) => {
        const { nombre, descripcion, dificultad, tipo, clase_id } = req.body;

        // Validaciones
        if (!nombre || typeof nombre !== 'string' || nombre.trim().length === 0) {
            return res.status(400).json({ error: 'El nombre del juego es obligatorio y debe ser una cadena no vacía' });
        }
        if (!descripcion || typeof descripcion !== 'string' || descripcion.trim().length === 0) {
            return res.status(400).json({ error: 'La descripción del juego es obligatoria y debe ser una cadena no vacía' });
        }
        if (!dificultad || !['baja', 'media', 'alta'].includes(dificultad)) {
            return res.status(400).json({ error: 'La dificultad debe ser baja, media o alta' });
        }
        if (!tipo || typeof tipo !== 'string' || tipo.trim().length === 0) {
            return res.status(400).json({ error: 'El tipo de juego es obligatorio y debe ser una cadena no vacía' });
        }
        if (!clase_id || isNaN(clase_id) || clase_id <= 0) {
            return res.status(400).json({ error: 'El ID de la clase debe ser un número válido' });
        }

        try {
            const nuevoJuego = await JuegoModel.crearJuego({ nombre, descripcion, dificultad, tipo, clase_id });
            res.status(201).json(nuevoJuego);
        } catch (error) {
            console.error("Error al crear el juego:", error);
            res.status(500).json({ message: 'Error al crear el juego' });
        }
    },

    // Obtener todos los juegos
    obtenerJuegos: async (req, res) => {
        try {
            const juegos = await JuegoModel.obtenerJuegos();
            res.status(200).json(juegos);
        } catch (error) {
            console.error("Error al obtener los juegos:", error);
            res.status(500).json({ message: 'Error al obtener los juegos' });
        }
    },

    // Obtener un juego por su ID
    obtenerJuegoPorId: async (req, res) => {
        const { id_juego } = req.params;

        // Validaciones
        if (!id_juego || isNaN(id_juego) || id_juego <= 0) {
            return res.status(400).json({ error: 'El ID del juego debe ser un número válido' });
        }

        try {
            const juego = await JuegoModel.obtenerJuegoPorId(id_juego);
            if (!juego) {
                return res.status(404).json({ message: 'Juego no encontrado' });
            }
            res.status(200).json(juego);
        } catch (error) {
            console.error("Error al obtener el juego:", error);
            res.status(500).json({ message: 'Error al obtener el juego' });
        }
    },

    // Modificar un juego
    modificarJuego: async (req, res) => {
        const { id_juego } = req.params;
        const { nombre, descripcion, dificultad, tipo, clase_id } = req.body;

        // Validaciones
        if (!id_juego || isNaN(id_juego) || id_juego <= 0) {
            return res.status(400).json({ error: 'El ID del juego debe ser un número válido' });
        }
        if (nombre && (typeof nombre !== 'string' || nombre.trim().length === 0)) {
            return res.status(400).json({ error: 'El nombre del juego debe ser una cadena no vacía' });
        }
        if (descripcion && (typeof descripcion !== 'string' || descripcion.trim().length === 0)) {
            return res.status(400).json({ error: 'La descripción del juego debe ser una cadena no vacía' });
        }
        if (dificultad && !['baja', 'media', 'alta'].includes(dificultad)) {
            return res.status(400).json({ error: 'La dificultad debe ser baja, media o alta' });
        }
        if (tipo && (typeof tipo !== 'string' || tipo.trim().length === 0)) {
            return res.status(400).json({ error: 'El tipo de juego debe ser una cadena no vacía' });
        }
        if (clase_id && (isNaN(clase_id) || clase_id <= 0)) {
            return res.status(400).json({ error: 'El ID de la clase debe ser un número válido' });
        }

        try {
            const juegoModificado = await JuegoModel.modificarJuego(id_juego, { nombre, descripcion, dificultad, tipo, clase_id });
            if (!juegoModificado) {
                return res.status(404).json({ message: 'Juego no encontrado' });
            }
            res.status(200).json(juegoModificado);
        } catch (error) {
            console.error("Error al modificar el juego:", error);
            res.status(500).json({ message: 'Error al modificar el juego' });
        }
    },

    // Eliminar un juego
    eliminarJuego: async (req, res) => {
        const { id_juego } = req.params;

        // Validaciones
        if (!id_juego || isNaN(id_juego) || id_juego <= 0) {
            return res.status(400).json({ error: 'El ID del juego debe ser un número válido' });
        }

        try {
            const juegoEliminado = await JuegoModel.eliminarJuego(id_juego);
            if (!juegoEliminado) {
                return res.status(404).json({ message: 'Juego no encontrado' });
            }
            res.status(200).json({ message: 'Juego eliminado con éxito' });
        } catch (error) {
            console.error("Error al eliminar el juego:", error);
            res.status(500).json({ message: 'Error al eliminar el juego' });
        }
    }
};

module.exports = juegosController;
