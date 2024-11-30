const feedbackModel = require('../models/feedbackModel');

/**
 * Obtener el feedback de un docente sobre la efectividad de una estrategia de enseñanza.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 */
const obtenerFeedback = async (req, res) => {
    const { id } = req.params;

    try {
        const feedback = await feedbackModel.obtenerFeedback(id);
        if (!feedback) {
            return res.status(404).json({ message: 'Feedback no encontrado.' });
        }
        res.status(200).json({ feedback });
    } catch (error) {
        console.error('Error al obtener el feedback:', error);
        res.status(500).json({ message: 'Error al obtener el feedback' });
    }
};

/**
 * Enviar feedback sobre una estrategia de enseñanza.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 */
const enviarFeedback = async (req, res) => {
    const { estrategiaId, comentario, efectividad } = req.body;
    const docenteId = req.usuario.id_usuario; // Suponiendo que el ID del docente viene del token.

    if (!estrategiaId || !comentario || !efectividad) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    try {
        const nuevoFeedback = await feedbackModel.enviarFeedback(docenteId, estrategiaId, comentario, efectividad);
        res.status(201).json({ message: 'Feedback enviado con éxito', feedback: nuevoFeedback });
    } catch (error) {
        console.error('Error al enviar el feedback:', error);
        res.status(500).json({ message: 'Error al enviar el feedback' });
    }
};

/**
 * Obtener el historial de acciones importantes.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 */
const obtenerHistorial = async (req, res) => {
    try {
        const historial = await feedbackModel.obtenerHistorial();
        res.status(200).json({ historial });
    } catch (error) {
        console.error('Error al obtener el historial:', error);
        res.status(500).json({ message: 'Error al obtener el historial' });
    }
};

module.exports = {
    obtenerFeedback,
    enviarFeedback,
    obtenerHistorial,
};
