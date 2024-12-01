const groupModel = require('../models/groupModel');

/**
 * Crear un nuevo grupo
 * @param {Object} req - La solicitud HTTP
 * @param {Object} res - La respuesta HTTP
 */
const crearGrupo = async (req, res) => {
    const { nombre, codigo_unico, grado, id_director, id_docente } = req.body;

    console.log('Datos recibidos en la solicitud:', { nombre, codigo_unico, grado, id_director, id_docente });
    console.log('Usuario autenticado:', req.usuario);

    // Validar que el usuario sea un director
    if (req.usuario.role !== 2) {
        return res.status(403).json({ message: 'Acceso denegado. Solo los directores pueden crear grupos.' });
    }

    if (!nombre || !codigo_unico || !grado || !id_director ||!id_docente) {
        console.warn('Campos obligatorios faltantes:', { nombre, codigo_unico, grado, id_director, id_docente });
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    try {
        console.log('Intentando registrar grupo con datos:', {
            nombre,
            codigo_unico,
            id_docente,
            id_director,
            grado,
        });

        const nuevoGrupo = await groupModel.registrarGrupo(
            nombre,
            codigo_unico,
            id_docente,
            id_director,
            grado
        );

        console.log('Grupo registrado con éxito:', nuevoGrupo);

        res.status(201).json({ message: 'Grupo creado con éxito', grupo: nuevoGrupo });
    } catch (error) {
        console.error('Error al crear el grupo:', error.message);
        res.status(500).json({ message: 'Error al crear el grupo', error: error.message });
    }
};

/**
 * Obtener todos los grupos asignados a un docente
 * @param {Object} req - La solicitud HTTP
 * @param {Object} res - La respuesta HTTP
 */
const obtenerGrupos = async (req, res) => {
    const id_docente = req.usuario.id_usuario;

    try {
        const grupos = await groupModel.obtenerGruposPorDocente(id_docente);
        if (grupos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron grupos para este docente.' });
        }
        res.status(200).json({ grupos });
    } catch (error) {
        console.error('Error al obtener los grupos:', error.message);
        res.status(500).json({ message: 'Error al obtener los grupos' });
    }
};

/**
 * Obtener un grupo por ID
 * @param {Object} req - La solicitud HTTP
 * @param {Object} res - La respuesta HTTP
 */
const obtenerGrupoPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const grupo = await groupModel.obtenerGrupoPorId(id);
        if (!grupo) {
            return res.status(404).json({ message: 'Grupo no encontrado.' });
        }
        res.status(200).json({ grupo });
    } catch (error) {
        console.error('Error al obtener el grupo:', error.message);
        res.status(500).json({ message: 'Error al obtener el grupo' });
    }
};

/**
 * Actualizar un grupo por ID
 * @param {Object} req - La solicitud HTTP
 * @param {Object} res - La respuesta HTTP
 */
const actualizarGrupo = async (req, res) => {
    const { id } = req.params;
    const { nombre, codigo_unico, grado } = req.body;

    if (req.usuario.role !== 2) {
        console.warn('Acceso denegado: Solo los directores pueden actualizar grupos.');
        return res.status(403).json({ message: 'Acceso denegado. Solo los directores pueden actualizar grupos.' });
    }

    try {
        const grupoActualizado = await groupModel.actualizarGrupo(id, nombre, codigo_unico, grado);
        if (!grupoActualizado) {
            return res.status(404).json({ message: 'Grupo no encontrado.' });
        }
        res.status(200).json({ message: 'Grupo actualizado con éxito', grupo: grupoActualizado });
    } catch (error) {
        console.error('Error al actualizar el grupo:', error.message);
        res.status(500).json({ message: 'Error al actualizar el grupo' });
    }
};

/**
 * Eliminar un grupo por ID
 * @param {Object} req - La solicitud HTTP
 * @param {Object} res - La respuesta HTTP
 */
const eliminarGrupo = async (req, res) => {
    const { id } = req.params;

    if (req.usuario.role !== 2) {
        console.warn('Acceso denegado: Solo los directores pueden eliminar grupos.');
        return res.status(403).json({ message: 'Acceso denegado. Solo los directores pueden eliminar grupos.' });
    }

    try {
        await groupModel.eliminarGrupo(id);
        res.status(200).json({ message: 'Grupo eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar el grupo:', error.message);
        res.status(500).json({ message: 'Error al eliminar el grupo' });
    }
};

module.exports = {
    crearGrupo,
    obtenerGrupos,
    obtenerGrupoPorId,
    actualizarGrupo,
    eliminarGrupo,
};
