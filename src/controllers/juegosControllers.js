const JuegoModel = require('../models/juegoModel'); // Asegúrate de tener este modelo

const juegosController = {
    // Crear un nuevo juego
    crearJuego: async (req, res) => {
        const { nombre, descripcion, dificultad, tipo, clase_id } = req.body;

        if (!nombre || !descripcion || !dificultad || !tipo || !clase_id) {
            return res.status(400).json({ error: 'Faltan datos necesarios para crear el juego' });
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