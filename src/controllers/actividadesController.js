const actividadesModel = require('../models/actividadesModel');

/**
 * Obtener todas las actividades
 */
const obtenerActividadesController = async (req, res) => {
    try {
        const actividades = await actividadesModel.obtenerActividades();
        res.status(200).json(actividades);
    } catch (error) {
        console.error('Error al obtener actividades:', error);
        res.status(500).json({ message: 'Error al obtener las actividades.' });
    }
};

/**
 * Agregar una nueva actividad
 */
const agregarActividadController = async (req, res) => {
    const actividadData = req.body;
    try {
        const nuevaActividad = await actividadesModel.agregarActividad(actividadData);
        res.status(201).json(nuevaActividad);
    } catch (error) {
        console.error('Error al agregar la actividad:', error);
        res.status(500).json({ message: 'Error al agregar la actividad.' });
    }
};

/**
 * Actualizar una actividad existente
 */
const actualizarActividadController = async (req, res) => {
    const { id } = req.params;
    const actividadData = req.body;
    try {
        const actividadActualizada = await actividadesModel.actualizarActividad(id, actividadData);
        res.status(200).json(actividadActualizada);
    } catch (error) {
        console.error('Error al actualizar la actividad:', error);
        res.status(500).json({ message: 'Error al actualizar la actividad.' });
    }
};

/**
 * Eliminar una actividad
 */
const eliminarActividadController = async (req, res) => {
    const { id } = req.params;
    try {
        const actividadEliminada = await actividadesModel.eliminarActividad(id);
        res.status(200).json({ message: 'Actividad eliminada con éxito', actividad: actividadEliminada });
    } catch (error) {
        console.error('Error al eliminar la actividad:', error);
        res.status(500).json({ message: 'Error al eliminar la actividad.' });
    }
};

module.exports = {
    obtenerActividadesController,
    agregarActividadController,
    actualizarActividadController,
    eliminarActividadController,
};
