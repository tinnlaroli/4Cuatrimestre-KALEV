const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authModel = require('../models/userModel');

const SECRET_KEY = process.env.JWT_SECRET || 'mi_secreta';

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

// Resto del código...

module.exports = {
    registrarUsuario,
    loginUsuario
};
