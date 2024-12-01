const groupModel = require('../models/groupModel');

/**
 * Crear un nuevo grupo
 * @param {Object} req - La solicitud HTTP
 * @param {Object} res - La respuesta HTTP
 */
const crearGrupo = async (req, res) => {
    const { nombre, codigo_unico, grado } = req.body;

    // Log de los datos recibidos en la solicitud
    console.log('Datos recibidos en la solicitud:', { nombre, codigo_unico, grado });

    // Log del usuario autenticado
    console.log('Usuario autenticado:', req.usuario);

    // Validar que el usuario sea un director (role: 2)
    if (req.usuario.role !== 2) {
        console.warn('Acceso denegado: El usuario no es un director.');
        return res.status(403).json({ message: 'Acceso denegado. Solo los directores pueden crear grupos.' });
    }

    // Validar que los campos requeridos estén presentes
    if (!nombre || !codigo_unico || !grado) {
        console.warn('Campos obligatorios faltantes:', { nombre, codigo_unico, grado });
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    try {
        // Intentar registrar el grupo
        console.log('Intentando registrar grupo:', { nombre, codigo_unico, id_director: req.usuario.id_usuario, grado });

        const nuevoGrupo = await groupModel.registrarGrupo(
            nombre,
            codigo_unico,
            req.usuario.id_usuario, // ID del director desde el token
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
    const id_docente = req.usuario.id_usuario; // ID del docente desde el token

    try {
        const grupos = await groupModel.obtenerGruposPorDocente(id_docente);
        if (grupos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron grupos para este docente.' });
        }
        res.status(200).json({ grupos });
    } catch (error) {
        console.error('Error al obtener los grupos:', error);
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
        console.error('Error al obtener el grupo:', error);
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

    // Verificar si el usuario tiene el rol de director
    if (req.usuario.role !== 2) { // 2 corresponde al rol de director
        return res.status(403).json({ message: 'Acceso denegado. Solo los directores pueden actualizar grupos.' });
    }

    try {
        const grupoActualizado = await groupModel.actualizarGrupo(id, nombre, codigo_unico, grado);
        if (!grupoActualizado) {
            return res.status(404).json({ message: 'Grupo no encontrado.' });
        }
        res.status(200).json({ message: 'Grupo actualizado con éxito', grupo: grupoActualizado });
    } catch (error) {
        console.error('Error al actualizar el grupo:', error);
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

    // Verificar si el usuario tiene el rol de director
    if (req.usuario.role !== 2) { // 2 corresponde al rol de director
        return res.status(403).json({ message: 'Acceso denegado. Solo los directores pueden eliminar grupos.' });
    }

    try {
        await groupModel.eliminarGrupo(id);
        res.status(200).json({ message: 'Grupo eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar el grupo:', error);
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
