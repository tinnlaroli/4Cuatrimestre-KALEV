const UsuarioModel = require('../models/usuarioModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Crear un nuevo usuario
const crearUsuario = async (req, res) => {
    const { nombre, rol, correo, contraseña } = req.body;

    try {
        // Validación de entrada
        if (!nombre || !rol || !correo || !contraseña) {
            return res.status(400).json({ message: 'Todos los campos son requeridos' });
        }

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
        // Validación de campos
        if (!nombre || !correo || !rol || estado === undefined) {
            return res.status(400).json({ message: 'Todos los campos son requeridos' });
        }

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
        // Validación de campos
        if (!correo || !contraseña) {
            return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
        }

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
    const { id } = req.params;  // Acceder al parámetro de la ruta
    const { contraseñaActual, contraseñaNueva } = req.body;

    console.log('ID del usuario:', id);  // Verificar que el id esté correctamente extraído
    console.log('Contraseña actual:', contraseñaActual);

    try {
        // Validación de entrada
        if (!contraseñaActual) {
            return res.status(400).json({ message: 'La contraseña actual es requerida' });
        }
        if (!contraseñaNueva) {
            return res.status(400).json({ message: 'La nueva contraseña es requerida' });
        }

        // Obtener el usuario de la base de datos
        const usuario = await UsuarioModel.obtenerUsuarioPorId(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar que la contraseña actual exista
        if (!usuario.contraseña) {
            return res.status(500).json({ message: 'Error interno: contraseña no encontrada en la base de datos' });
        }

        // Comparar la contraseña actual con el hash almacenado
        const esCorrecta = await bcrypt.compare(contraseñaActual, usuario.contraseña);
        if (!esCorrecta) {
            return res.status(400).json({ message: 'Contraseña actual incorrecta' });
        }

        // Encriptar la nueva contraseña
        const hashContraseñaNueva = await bcrypt.hash(contraseñaNueva, 10);

        // Actualizar la contraseña en la base de datos
        await UsuarioModel.cambiarContraseña({ id, nuevaContraseñaHash: hashContraseñaNueva });

        // Respuesta exitosa
        res.status(200).json({ message: 'Contraseña actualizada con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al cambiar la contraseña. Intenta nuevamente más tarde.' });
    }
};


    exports.subirFoto = (req, res) => {
        const { id_usuario } = req.params;
    
        if (!req.file) {
        return res.status(400).json({ mensaje: 'No se ha subido ninguna foto.' });
        }
    
        const fotoPath = path.join(__dirname, '../uploads', req.file.filename);
    
        // Aquí puedes actualizar la base de datos con la URL de la foto
        // Ejemplo: Usuario.findByIdAndUpdate(id_usuario, { foto: fotoPath }, ...)
    
        res.status(200).json({
        mensaje: 'Foto subida con éxito.',
        url_foto: fotoPath // o la URL pública de la imagen
        });
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
