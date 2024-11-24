const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosControler');
const validarToken = require('../middlewares/validarToken');

// Ruta de prueba básica (solo para verificar que funciona sin validarToken)
router.get('/prueba', (req, res) => {
    console.log('Ruta alcanzada después del middleware global');
    res.json({ message: 'Prueba exitosa después del middleware global' });
});

// Rutas para manejar los usuarios
router.post('/', usuariosController.crearUsuario);  // Crear un nuevo usuario (público)
router.get('/', validarToken(), usuariosController.obtenerUsuarios);  // Obtener todos los usuarios (protegido)
router.get('/:id', validarToken(), usuariosController.obtenerUsuarioPorId);  // Obtener un usuario por ID (protegido)
router.put('/:id', validarToken(), usuariosController.actualizarUsuario);  // Actualizar un usuario (protegido)
router.delete('/:id', validarToken(), usuariosController.eliminarUsuario);  // Eliminar un usuario (protegido)
router.post('/login', usuariosController.loginUsuario);  // Autenticar usuario y generar JWT (público)
router.put('/cambiarContrasenia/:id', validarToken(), usuariosController.cambiarContraseña);  // Cambiar contraseña (protegido)


module.exports = router;