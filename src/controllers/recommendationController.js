const recommendationModel = require('../models/recommendationModel');

const obtenerTodasLasRecomendaciones = async (req, res) => {
    try {
        const recomendaciones = await recommendationModel.obtenerRecomendaciones();
        res.status(200).json(recomendaciones);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las recomendaciones', error });
    }
};

const obtenerRecomendacionPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const recomendacion = await recommendationModel.obtenerRecomendacionPorId(id);
        if (recomendacion) {
            res.status(200).json(recomendacion);
        } else {
            res.status(404).json({ message: 'Recomendación no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la recomendación', error });
    }
};

const crearRecomendacion = async (req, res) => {
    try {
        const { nombre, descripcion, estilo_aprendizaje } = req.body;
        const nuevaRecomendacion = await recommendationModel.crearRecomendacion(nombre, descripcion, estilo_aprendizaje);
        res.status(201).json(nuevaRecomendacion);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la recomendación', error });
    }
};

const actualizarRecomendacion = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, estilo_aprendizaje } = req.body;
        const recomendacionActualizada = await recommendationModel.actualizarRecomendacion(id, nombre, descripcion, estilo_aprendizaje);
        if (recomendacionActualizada) {
            res.status(200).json(recomendacionActualizada);
        } else {
            res.status(404).json({ message: 'Recomendación no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la recomendación', error });
    }
};

const eliminarRecomendacion = async (req, res) => {
    try {
        const { id } = req.params;
        const recomendacionEliminada = await recommendationModel.eliminarRecomendacion(id);
        if (recomendacionEliminada) {
            res.status(200).json({ message: 'Recomendación eliminada', id: recomendacionEliminada.id_recomendacion });
        } else {
            res.status(404).json({ message: 'Recomendación no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la recomendación', error });
    }
};

module.exports = {
    obtenerTodasLasRecomendaciones,
    obtenerRecomendacionPorId,
    crearRecomendacion,
    actualizarRecomendacion,
    eliminarRecomendacion,
};
