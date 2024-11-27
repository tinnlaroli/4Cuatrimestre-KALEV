const UsuarioModel = require('../models/usuarioModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Crear un nuevo usuario
const crearUsuario = async (req, res) => {
    const { nombre, rol, correo, contraseña } = req.body;

    try {
        // Verificar si el correo ya está registrado
        const usuarioExistente = await UsuarioModel.obtenerUsuarioPorCorreo(correo);
        if (usuarioExistente) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        // Encriptar la contraseña
        const contraseñaHash = await bcrypt.hash(contraseña, 10);

        // Crear el usuario
        const nuevoUsuario = await UsuarioModel.crearUsuario({ nombre, rol, correo, contraseñaHash });
        res.status(201).json({ message: 'Usuario creado con éxito', usuario: nuevoUsuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
};

// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await UsuarioModel.obtenerUsuarios();
        res.status(200).json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
};

// Obtener un usuario por ID
const obtenerUsuarioPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const usuario = await UsuarioModel.obtenerUsuarioPorId(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el usuario' });
    }
};

// Actualizar un usuario
const actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, correo, rol, estado } = req.body;

    try {
        const usuarioActualizado = await UsuarioModel.actualizarUsuario({ id, nombre, correo, rol, estado });
        if (!usuarioActualizado) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(usuarioActualizado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
};

// Eliminar un usuario
const eliminarUsuario = async (req, res) => {
    const { id } = req.params;

    try {
        const usuarioEliminado = await UsuarioModel.eliminarUsuario(id);
        if (!usuarioEliminado) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
};

// Autenticar usuario y generar JWT
const loginUsuario = async (req, res) => {
    const { correo, contraseña } = req.body;

    try {
        // Verificar si el usuario existe
        const usuario = await UsuarioModel.obtenerUsuarioPorCorreo(correo);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario o contraseña incorrectos' });
        }

        // Comparar la contraseña
        const esValida = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!esValida) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }

        // Generar el token
        const token = jwt.sign(
            { id_usuario: usuario.id_usuario, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Autenticación exitosa', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al autenticar usuario' });
    }
};

// Cambiar contraseña
const cambiarContraseña = async (req, res) => {
    const { id } = req.params;
    const { contraseñaActual, nuevaContraseña } = req.body;

    try {
        // Verificar si el usuario existe
        const usuario = await UsuarioModel.obtenerUsuarioPorId(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Validar contraseña actual
        const esValida = await bcrypt.compare(contraseñaActual, usuario.contraseña_hash);
        if (!esValida) {
            return res.status(401).json({ message: 'Contraseña actual incorrecta' });
        }

        // Hashear la nueva contraseña
        const nuevaContraseñaHash = await bcrypt.hash(nuevaContraseña, 10);

        // Actualizar la contraseña
        const usuarioActualizado = await UsuarioModel.cambiarContraseña({ id, nuevaContraseñaHash });
        res.status(200).json({ message: 'Contraseña actualizada correctamente', usuario: usuarioActualizado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al cambiar la contraseña' });
    }
};

module.exports = {
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario,
    loginUsuario,
    cambiarContraseña,
};