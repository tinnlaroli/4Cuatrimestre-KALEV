const styleModel = require('../models/styleModel');

const getEstilos = async (req, res) => {
    try {
        const estilos = await styleModel.obtenerEstilos();
        res.status(200).json(estilos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los estilos de aprendizaje', error: error.message });
    }
};

const getEstiloById = async (req, res) => {
    const { id } = req.params;
    try {
        const estilo = await styleModel.obtenerEstiloPorId(id);
        if (!estilo) {
            return res.status(404).json({ message: 'Estilo no encontrado' });
        }
        res.status(200).json(estilo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el estilo de aprendizaje', error: error.message });
    }
};

const createEstilo = async (req, res) => {
    const { nombre, descripcion } = req.body;
    try {
        const nuevoEstilo = await styleModel.crearEstilo(nombre, descripcion);
        res.status(201).json(nuevoEstilo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el estilo de aprendizaje', error: error.message });
    }
};

const updateEstilo = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    try {
        const estiloActualizado = await styleModel.actualizarEstilo(id, nombre, descripcion);
        if (!estiloActualizado) {
            return res.status(404).json({ message: 'Estilo no encontrado' });
        }
        res.status(200).json(estiloActualizado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el estilo de aprendizaje', error: error.message });
    }
};

const deleteEstilo = async (req, res) => {
    const { id } = req.params;
    try {
        const estiloEliminado = await styleModel.eliminarEstilo(id);
        if (!estiloEliminado) {
            return res.status(404).json({ message: 'Estilo no encontrado' });
        }
        res.status(200).json({ message: 'Estilo eliminado correctamente', id: estiloEliminado.id_estilo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el estilo de aprendizaje', error: error.message });
    }
};

module.exports = {
    getEstilos,
    getEstiloById,
    createEstilo,
    updateEstilo,
    deleteEstilo,
};
