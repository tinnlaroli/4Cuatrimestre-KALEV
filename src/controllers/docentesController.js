const DocenteModel = require('../models/docentesModel');
const DirectorModel = require('../models/directoreModel');

const docentesController = {
    // Crear un nuevo docente
    crearDocente: async (req, res) => {
        const { nombre, apellido, correo, contrasena } = req.body;

        // Validaciones
        if (!nombre || typeof nombre !== 'string' || nombre.trim().length === 0) {
            return res.status(400).json({ error: 'El nombre del docente es obligatorio y debe ser una cadena no vacía' });
        }
        if (!apellido || typeof apellido !== 'string' || apellido.trim().length === 0) {
            return res.status(400).json({ error: 'El apellido del docente es obligatorio y debe ser una cadena no vacía' });
        }
        if (!correo || typeof correo !== 'string' || !correo.includes('@')) {
            return res.status(400).json({ error: 'El correo es obligatorio y debe tener un formato válido' });
        }
        if (!contrasena || contrasena.length < 6) {
            return res.status(400).json({ error: 'La contraseña es obligatoria y debe tener al menos 6 caracteres' });
        }

        try {
            const nuevoDocente = await DocenteModel.crearDocente({ nombre, apellido, correo, contrasena });
            res.status(201).json(nuevoDocente);
        } catch (error) {
            console.error("Error al crear el docente:", error);
            res.status(500).json({ message: 'Error al crear el docente' });
        }
    },

    // Obtener todos los docentes
    obtenerDocentes: async (req, res) => {
        try {
            const docentes = await DocenteModel.obtenerDocentes();
            res.status(200).json(docentes);
        } catch (error) {
            console.error("Error al obtener los docentes:", error);
            res.status(500).json({ message: 'Error al obtener los docentes' });
        }
    },

    // Obtener un docente por su ID
    obtenerDocentePorId: async (req, res) => {
        const { id_docente } = req.params;

        if (!id_docente || isNaN(id_docente) || id_docente <= 0) {
            return res.status(400).json({ error: 'El ID del docente debe ser un número válido' });
        }

        try {
            const docente = await DocenteModel.obtenerDocentePorId(id_docente);
            if (!docente) {
                return res.status(404).json({ message: 'Docente no encontrado' });
            }
            res.status(200).json(docente);
        } catch (error) {
            console.error("Error al obtener el docente:", error);
            res.status(500).json({ message: 'Error al obtener el docente' });
        }
    },

    // Modificar un docente
    modificarDocente: async (req, res) => {
        const { id_docente } = req.params;
        const { nombre, apellido, correo, contrasena } = req.body;

        if (!id_docente || isNaN(id_docente) || id_docente <= 0) {
            return res.status(400).json({ error: 'El ID del docente debe ser un número válido' });
        }
        try {
            const docenteModificado = await DocenteModel.modificarDocente(id_docente, { nombre, apellido, correo, contrasena });
            if (!docenteModificado) {
                return res.status(404).json({ message: 'Docente no encontrado' });
            }
            res.status(200).json(docenteModificado);
        } catch (error) {
            console.error("Error al modificar el docente:", error);
            res.status(500).json({ message: 'Error al modificar el docente' });
        }
    },

    // Eliminar un docente
    eliminarDocente: async (req, res) => {
        const { id_docente } = req.params;

        if (!id_docente || isNaN(id_docente) || id_docente <= 0) {
            return res.status(400).json({ error: 'El ID del docente debe ser un número válido' });
        }

        try {
            const docenteEliminado = await DocenteModel.eliminarDocente(id_docente);
            if (!docenteEliminado) {
                return res.status(404).json({ message: 'Docente no encontrado' });
            }
            res.status(200).json({ message: 'Docente eliminado con éxito' });
        } catch (error) {
            console.error("Error al eliminar el docente:", error);
            res.status(500).json({ message: 'Error al eliminar el docente' });
        }
    },

    // Repite el mismo patrón para directores
    crearDirector: async (req, res) => {
        const { nombre, apellido, correo, contrasena } = req.body;

        if (!nombre || typeof nombre !== 'string' || nombre.trim().length === 0) {
            return res.status(400).json({ error: 'El nombre del director es obligatorio y debe ser una cadena no vacía' });
        }
        if (!apellido || typeof apellido !== 'string' || apellido.trim().length === 0) {
            return res.status(400).json({ error: 'El apellido del director es obligatorio y debe ser una cadena no vacía' });
        }
        if (!correo || typeof correo !== 'string' || !correo.includes('@')) {
            return res.status(400).json({ error: 'El correo es obligatorio y debe tener un formato válido' });
        }
        if (!contrasena || contrasena.length < 6) {
            return res.status(400).json({ error: 'La contraseña es obligatoria y debe tener al menos 6 caracteres' });
        }

        try {
            const nuevoDirector = await DirectorModel.crearDirector({ nombre, apellido, correo, contrasena });
            res.status(201).json(nuevoDirector);
        } catch (error) {
            console.error("Error al crear el director:", error);
            res.status(500).json({ message: 'Error al crear el director' });
        }
    },

    // Las demás rutas para directores son similares a las de docentes
};

module.exports = docentesController;
