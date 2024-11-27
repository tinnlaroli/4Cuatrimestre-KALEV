const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const validarToken = require('../middlewares/validarToken');

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Endpoints para la gestión de usuarios
 */

/**
 * @swagger
 * /usuarios/prueba:
 *   get:
 *     summary: Ruta de prueba básica
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Prueba exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 */

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del usuario
 *               correo:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *               contrasena:
 *                 type: string
 *                 description: Contraseña del usuario
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 */

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     security:
 *       - BearerAuth: []
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   nombre:
 *                     type: string
 *                   correo:
 *                     type: string
 */

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     security:
 *       - BearerAuth: []
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 nombre:
 *                   type: string
 *                 correo:
 *                   type: string
 */

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Actualizar un usuario
 *     security:
 *       - BearerAuth: []
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               correo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 */

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     security:
 *       - BearerAuth: []
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 */

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Autenticar usuario y generar JWT
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *               contrasena:
 *                 type: string
 *                 description: Contraseña del usuario
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT generado
 */

/**
 * @swagger
 * /usuarios/cambiarContrasenia/{id}:
 *   put:
 *     summary: Cambiar la contraseña de un usuario
 *     security:
 *       - BearerAuth: []
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contrasenaActual:
 *                 type: string
 *                 description: Contraseña actual del usuario
 *               nuevaContrasena:
 *                 type: string
 *                 description: Nueva contraseña del usuario
 *     responses:
 *       200:
 *         description: Contraseña cambiada exitosamente
 */

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
