const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const validarToken = require('../middlewares/validarToken');

/**
 * @swagger
 * /prueba:
 *   get:
 *     summary: Ruta de prueba para verificar el middleware global
 *     description: Esta ruta es solo para probar que el middleware global se ejecuta correctamente.
 *     tags: [Prueba]
 *     responses:
 *       200:
 *         description: Respuesta exitosa, ruta alcanzada después del middleware global
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Prueba exitosa después del middleware global"
 */

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     description: Permite crear un nuevo usuario en el sistema. Ruta pública.
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
 *               correo:
 *                 type: string
 *               contrasena:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado con éxito
 *       400:
 *         description: Datos inválidos o incompletos
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     description: Obtiene una lista de todos los usuarios registrados en el sistema. Ruta protegida.
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *                   correo:
 *                     type: string
 *       401:
 *         description: Token no válido o expirado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     description: Obtiene los datos de un usuario especificado por su ID. Ruta protegida.
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a obtener
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 correo:
 *                   type: string
 *       404:
 *         description: Usuario no encontrado
 *       401:
 *         description: Token no válido o expirado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Actualizar un usuario
 *     description: Permite actualizar la información de un usuario especificado por su ID. Ruta protegida.
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a actualizar
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
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario actualizado con éxito
 *       400:
 *         description: Datos inválidos o incompletos
 *       401:
 *         description: Token no válido o expirado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     description: Elimina un usuario especificado por su ID. Ruta protegida.
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a eliminar
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario eliminado con éxito
 *       404:
 *         description: Usuario no encontrado
 *       401:
 *         description: Token no válido o expirado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Autenticar usuario y generar JWT
 *     description: Permite a un usuario autenticarse proporcionando su correo y contraseña, y recibir un JWT para futuras solicitudes.
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
 *               contrasena:
 *                 type: string
 *     responses:
 *       200:
 *         description: Autenticación exitosa, JWT generado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Datos inválidos o incompletos
 *       401:
 *         description: Credenciales incorrectas
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /usuarios/cambiarContrasenia/{id}:
 *   put:
 *     summary: Cambiar la contraseña de un usuario
 *     description: Permite a un usuario cambiar su contraseña proporcionada su ID y nueva contraseña. Ruta protegida.
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario que cambiará su contraseña
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nueva_contrasena:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Contraseña cambiada con éxito
 *       400:
 *         description: Datos inválidos o incompletos
 *       401:
 *         description: Token no válido o expirado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
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
