const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authModel = require('../models/userModel');

const SECRET_KEY = process.env.JWT_SECRET || 'mi_secreta';

/**
 * Registra un nuevo usuario en la base de datos.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 */
const registrarUsuario = async (req, res) => {
    const { nombre, correo, password, role } = req.body;
    if (!nombre || !correo || !password || !role) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const nuevoUsuario = await authModel.registrarUsuario(nombre, correo, hashedPassword, role);
        res.status(201).json({ message: 'Usuario registrado con éxito', usuario: nuevoUsuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
};

/**
 * Inicia sesión de un usuario y genera un token de autenticación.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 */
const loginUsuario = async (req, res) => {
    const { correo, password } = req.body;
    if (!correo || !password) {
        return res.status(400).json({ message: 'Correo y contraseña son obligatorios.' });
    }

    try {
        const usuario = await authModel.autenticarUsuario(correo);
        if (!usuario) {
            return res.status(401).json({ message: 'Correo o contraseña incorrectos.' });
        }

        const isPasswordValid = await bcrypt.compare(password, usuario.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Correo o contraseña incorrectos.' });
        }

        const token = jwt.sign({ id: usuario.id_usuario, role: usuario.role }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el inicio de sesión' });
    }
};

/**
 * Obtiene los detalles de un usuario por su ID.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 */
const obtenerUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await authModel.obtenerUsuarioPorId(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        res.status(200).json({ usuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el usuario' });
    }
};

/**
 * Actualiza los detalles de un usuario existente.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 */
const actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, correo, role } = req.body;
    try {
        const usuarioActualizado = await authModel.actualizarUsuario(id, nombre, correo, role);
        if (!usuarioActualizado) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        res.status(200).json({ message: 'Usuario actualizado', usuario: usuarioActualizado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
};

/**
 * Elimina un usuario de la base de datos.
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 */
const eliminarUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const usuarioEliminado = await authModel.eliminarUsuario(id);
        if (!usuarioEliminado) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
};

module.exports = {
    registrarUsuario,
    loginUsuario,
    obtenerUsuario,
    actualizarUsuario,
    eliminarUsuario,
};
