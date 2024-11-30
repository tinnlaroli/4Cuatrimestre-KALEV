// **Controller (classController.js)**
const classModel = require('../models/classModel');

/**
 * Crear una nueva clase
 * @param {Object} req - La solicitud HTTP
 * @param {Object} res - La respuesta HTTP
 */
const crearClase = async (req, res) => {
    const { nombre, descripcion, codigo_unico } = req.body;

    if (!nombre || !descripcion || !codigo_unico) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    try {
        const nuevaClase = await classModel.crearClase(nombre, descripcion, codigo_unico);
        res.status(201).json({ message: 'Clase creada con éxito', clase: nuevaClase });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la clase' });
    }
};

/**
 * Obtener todas las clases asignadas al docente autenticado
 * @param {Object} req - La solicitud HTTP
 * @param {Object} res - La respuesta HTTP
 */
const obtenerClases = async (req, res) => {
    const id_docente = req.usuario.id_usuario; // Obtener el ID del docente desde el token o la sesión

    try {
        const clases = await classModel.obtenerClasesPorDocente(id_docente);
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
 * Obtener una clase por ID
 * @param {Object} req - La solicitud HTTP
 * @param {Object} res - La respuesta HTTP
 */
const obtenerClasePorId = async (req, res) => {
    const { id } = req.params;

    try {
        const clase = await classModel.obtenerClasePorId(id);
        if (!clase) {
            return res.status(404).json({ message: 'Clase no encontrada.' });
        }
        res.status(200).json({ clase });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la clase' });
    }
};

/**
 * Actualizar una clase por ID
 * @param {Object} req - La solicitud HTTP
 * @param {Object} res - La respuesta HTTP
 */
const actualizarClase = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, codigo_unico } = req.body;

    try {
        const claseActualizada = await classModel.actualizarClase(id, nombre, descripcion, codigo_unico);
        if (!claseActualizada) {
            return res.status(404).json({ message: 'Clase no encontrada.' });
        }
        res.status(200).json({ message: 'Clase actualizada', clase: claseActualizada });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la clase' });
    }
};

/**
 * Eliminar una clase por ID
 * @param {Object} req - La solicitud HTTP
 * @param {Object} res - La respuesta HTTP
 */
const eliminarClase = async (req, res) => {
    const { id } = req.params;

    try {
        const claseEliminada = await classModel.eliminarClase(id);
        if (!claseEliminada) {
            return res.status(404).json({ message: 'Clase no encontrada.' });
        }
        res.status(200).json({ message: 'Clase eliminada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la clase' });
    }
};

module.exports = {
    crearClase,
    obtenerClases,
    obtenerClasePorId,
    actualizarClase,
    eliminarClase,
};
