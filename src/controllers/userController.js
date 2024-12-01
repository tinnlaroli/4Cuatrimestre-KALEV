const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuarioModel = require('../models/userModel');
const { pool } = require('../config/dbConfig');

const SECRET_KEY = process.env.JWT_SECRET || 'mi_secreta';

/**
 * Registrar un nuevo usuario.
 */
const registrarUsuario = async (req, res) => {
    const { nombre, correo, password, rol } = req.body;

    if (!nombre || !correo || !password || !rol) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    try {
        // Validar que el rol existe
        const queryRol = `SELECT id_rol FROM public.roles WHERE LOWER(nombre_rol) = LOWER($1)`;
        const { rows: roles } = await pool.query(queryRol, [rol]);

        if (roles.length === 0) {
            return res.status(400).json({ message: 'El rol proporcionado no es válido.' });
        }

        const roleId = roles[0].id_rol;

        // Verificar si el correo ya está registrado
        const usuarioExistente = await usuarioModel.autenticarUsuario(correo);
        if (usuarioExistente) {
            return res.status(400).json({ message: 'El correo ya está registrado.' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Registrar usuario
        const nuevoUsuario = await usuarioModel.registrarUsuario(nombre, correo, hashedPassword, roleId);

        res.status(201).json({
            message: 'Usuario registrado con éxito.',
            data: nuevoUsuario,
        });
    } catch (error) {
        console.error('Error al registrar el usuario:', error.message);
        res.status(500).json({ message: 'Error al registrar el usuario.', error: error.message });
    }
};

/**
 * Iniciar sesión.
 */
const loginUsuario = async (req, res) => {
    const { correo, password } = req.body;

    if (!correo || !password) {
        return res.status(400).json({ message: 'Correo y contraseña son obligatorios.' });
    }

    try {
        const usuario = await usuarioModel.autenticarUsuario(correo);
        if (!usuario) {
            return res.status(401).json({ message: 'Correo o contraseña incorrectos.' });
        }

        const isPasswordValid = await bcrypt.compare(password, usuario.contrasena);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Correo o contraseña incorrectos.' });
        }

        const token = jwt.sign({ id: usuario.id_usuario, role: usuario.role }, SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Inicio de sesión exitoso.',
            token,
            usuario: {
                id_usuario: usuario.id_usuario,
                nombre: usuario.nombre,
                correo: usuario.correo,
                role: usuario.role,
            },
        });
    } catch (error) {
        console.error('Error en el inicio de sesión:', error.message);
        res.status(500).json({ message: 'Error en el inicio de sesión.', error: error.message });
    }
};

/**
 * Validar token.
 */
const validarToken = (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado.' });
    }

    try {
        const usuario = jwt.verify(token, SECRET_KEY);
        res.status(200).json({
            message: 'Token válido.',
            usuario: {
                id_usuario: usuario.id,
                role: usuario.role,
            },
        });
    } catch (error) {
        console.error('Error al validar el token:', error.message);
        res.status(401).json({ message: 'Token inválido o expirado.', error: error.message });
    }
};

/**
 * Obtener usuario por ID.
 */
const obtenerUsuario = async (req, res) => {
    const { id } = req.params;

    try {
        const usuario = await usuarioModel.obtenerUsuarioPorId(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        res.status(200).json({ message: 'Usuario obtenido con éxito.', data: usuario });
    } catch (error) {
        console.error('Error al obtener el usuario:', error.message);
        res.status(500).json({ message: 'Error al obtener el usuario.', error: error.message });
    }
};

/**
 * Actualizar usuario.
 */
const actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, correo, role } = req.body;

    try {
        const usuarioActualizado = await usuarioModel.actualizarUsuario(id, nombre, correo, role);
        if (!usuarioActualizado) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        res.status(200).json({ message: 'Usuario actualizado con éxito.', data: usuarioActualizado });
    } catch (error) {
        console.error('Error al actualizar el usuario:', error.message);
        res.status(500).json({ message: 'Error al actualizar el usuario.', error: error.message });
    }
};

/**
 * Eliminar usuario.
 */
const eliminarUsuario = async (req, res) => {
    const { id } = req.params;

    try {
        const usuarioEliminado = await usuarioModel.eliminarUsuario(id);
        if (!usuarioEliminado) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        res.status(200).json({ message: 'Usuario eliminado con éxito.' });
    } catch (error) {
        console.error('Error al eliminar el usuario:', error.message);
        res.status(500).json({ message: 'Error al eliminar el usuario.', error: error.message });
    }
};

module.exports = {
    registrarUsuario,
    loginUsuario,
    validarToken,
    obtenerUsuario,
    actualizarUsuario,
    eliminarUsuario,
};
