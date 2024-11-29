const DirectorModel = require('../models/directorModel'); // Asegúrate de que esta ruta sea correcta

const directoresController = {
    // Crear un nuevo director
    crearDirector: async (req, res) => {
        const { nombre, apellido, correo, telefono } = req.body;

        // Validaciones
        if (!nombre || typeof nombre !== 'string' || nombre.trim().length === 0) {
            return res.status(400).json({ error: 'El nombre del director es obligatorio y debe ser una cadena no vacía' });
        }
        if (!apellido || typeof apellido !== 'string' || apellido.trim().length === 0) {
            return res.status(400).json({ error: 'El apellido del director es obligatorio y debe ser una cadena no vacía' });
        }
        if (!correo || typeof correo !== 'string' || correo.trim().length === 0) {
            return res.status(400).json({ error: 'El correo del director es obligatorio y debe ser una cadena no vacía' });
        }
        if (telefono && typeof telefono !== 'string') {
            return res.status(400).json({ error: 'El teléfono debe ser una cadena válida' });
        }

        try {
            const nuevoDirector = await DirectorModel.crearDirector({ nombre, apellido, correo, telefono });
            res.status(201).json(nuevoDirector);
        } catch (error) {
            console.error('Error al crear director:', error);
            res.status(500).json({ message: 'Error al crear el director' });
        }
    },

    // Obtener todos los directores
    obtenerDirectores: async (req, res) => {
        try {
            const directores = await DirectorModel.obtenerDirectores();
            res.status(200).json(directores);
        } catch (error) {
            console.error('Error al obtener directores:', error);
            res.status(500).json({ message: 'Error al obtener los directores' });
        }
    },

    // Obtener un director por su ID
    obtenerDirectorPorId: async (req, res) => {
        const { id_director } = req.params;

        // Validaciones
        if (!id_director || isNaN(id_director) || id_director <= 0) {
            return res.status(400).json({ error: 'El ID del director debe ser un número válido' });
        }

        try {
            const director = await DirectorModel.obtenerDirectorPorId(id_director);
            if (!director) {
                return res.status(404).json({ message: 'Director no encontrado' });
            }
            res.status(200).json(director);
        } catch (error) {
            console.error('Error al obtener director:', error);
            res.status(500).json({ message: 'Error al obtener el director' });
        }
    },

    // Modificar un director
    modificarDirector: async (req, res) => {
        const { id_director } = req.params;
        const { nombre, apellido, correo, telefono } = req.body;

        // Validaciones
        if (!id_director || isNaN(id_director) || id_director <= 0) {
            return res.status(400).json({ error: 'El ID del director debe ser un número válido' });
        }
        if (nombre && (typeof nombre !== 'string' || nombre.trim().length === 0)) {
            return res.status(400).json({ error: 'El nombre debe ser una cadena no vacía' });
        }
        if (apellido && (typeof apellido !== 'string' || apellido.trim().length === 0)) {
            return res.status(400).json({ error: 'El apellido debe ser una cadena no vacía' });
        }
        if (correo && (typeof correo !== 'string' || correo.trim().length === 0)) {
            return res.status(400).json({ error: 'El correo debe ser una cadena no vacía' });
        }
        if (telefono && typeof telefono !== 'string') {
            return res.status(400).json({ error: 'El teléfono debe ser una cadena válida' });
        }

        try {
            const directorModificado = await DirectorModel.modificarDirector(id_director, { nombre, apellido, correo, telefono });
            if (!directorModificado) {
                return res.status(404).json({ message: 'Director no encontrado' });
            }
            res.status(200).json(directorModificado);
        } catch (error) {
            console.error('Error al modificar director:', error);
            res.status(500).json({ message: 'Error al modificar el director' });
        }
    },

    // Eliminar un director
    eliminarDirector: async (req, res) => {
        const { id_director } = req.params;

        // Validaciones
        if (!id_director || isNaN(id_director) || id_director <= 0) {
            return res.status(400).json({ error: 'El ID del director debe ser un número válido' });
        }

        try {
            const directorEliminado = await DirectorModel.eliminarDirector(id_director);
            if (!directorEliminado) {
                return res.status(404).json({ message: 'Director no encontrado' });
            }
            res.status(200).json({ message: 'Director eliminado con éxito' });
        } catch (error) {
            console.error('Error al eliminar director:', error);
            res.status(500).json({ message: 'Error al eliminar el director' });
        }
    }
};

module.exports = directoresController;
