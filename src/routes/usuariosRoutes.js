const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const validarToken = require('../middlewares/validarToken');

// Ruta de prueba básica (solo para verificar que funciona sin validarToken)
/**
 * @swagger
 * /api/usuarios/prueba:
 *   get:
 *     description: Ruta de prueba para verificar que el servidor funciona correctamente
 *     responses:
 *       200:
 *         description: Prueba exitosa
 */
router.get('/prueba', (req, res) => {
    console.log('Ruta alcanzada después del middleware global');
    res.json({ message: 'Prueba exitosa después del middleware global' });
});

// Rutas para manejar los usuarios

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     description: Crear un nuevo usuario
 *     parameters:
 *       - in: body
 *         name: usuario
 *         description: Datos del nuevo usuario
 *         schema:
 *           type: object
 *           required:
 *             - nombre
 *             - correo
 *             - contraseña
 *             - rol
 *           properties:
 *             nombre:
 *               type: string
 *             correo:
 *               type: string
 *             contraseña:
 *               type: string
 *             rol:
 *               type: string
 *               enum:
 *                 - jugador
 *                 - docente
 *     responses:
 *       201:
 *         description: Usuario creado con éxito
 *       400:
 *         description: El correo ya está registrado
 *       500:
 *         description: Error al crear el usuario
 */
router.post('/', usuariosController.crearUsuario);  // Crear un nuevo usuario (público)

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     description: Obtener todos los usuarios
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida con éxito
 *       401:
 *         description: Token no válido o expirado
 */
router.get('/', validarToken(), usuariosController.obtenerUsuarios);  // Obtener todos los usuarios (protegido)

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     description: Obtener un usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a obtener
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 *       401:
 *         description: Token no válido o expirado
 */
router.get('/:id', validarToken(), usuariosController.obtenerUsuarioPorId);  // Obtener un usuario por ID (protegido)

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     description: Actualizar un usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a actualizar
 *       - in: body
 *         name: usuario
 *         description: Datos del usuario a actualizar
 *         schema:
 *           type: object
 *           properties:
 *             nombre:
 *               type: string
 *             correo:
 *               type: string
 *             rol:
 *               type: string
 *               enum:
 *                 - jugador
 *                 - docente
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario actualizado con éxito
 *       400:
 *         description: Error en los datos enviados
 *       401:
 *         description: Token no válido o expirado
 */
router.put('/:id', validarToken(), usuariosController.actualizarUsuario);  // Actualizar un usuario (protegido)

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     description: Eliminar un usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a eliminar
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario eliminado con éxito
 *       404:
 *         description: Usuario no encontrado
 *       401:
 *         description: Token no válido o expirado
 */
router.delete('/:id', validarToken(), usuariosController.eliminarUsuario);  // Eliminar un usuario (protegido)

/**
 * @swagger
 * /api/usuarios/login:
 *   post:
 *     description: Autenticar usuario y generar JWT
 *     parameters:
 *       - in: body
 *         name: usuario
 *         description: Datos del usuario para iniciar sesión
 *         schema:
 *           type: object
 *           required:
 *             - correo
 *             - contraseña
 *           properties:
 *             correo:
 *               type: string
 *             contraseña:
 *               type: string
 *     responses:
 *       200:
 *         description: Autenticación exitosa
 *       401:
 *         description: Usuario o contraseña incorrectos
 */
router.post('/login', usuariosController.loginUsuario);  // Autenticar usuario y generar JWT (público)

/**
 * @swagger
 * /api/usuarios/cambiarContrasenia/{id}:
 *   put:
 *     description: Cambiar la contraseña de un usuario
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *       - in: body
 *         name: contraseña
 *         description: Nueva contraseña
 *         schema:
 *           type: object
 *           required:
 *             - nuevaContraseña
 *           properties:
 *             nuevaContraseña:
 *               type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Contraseña cambiada con éxito
 *       400:
 *         description: Error en los datos enviados
 *       401:
 *         description: Token no válido o expirado
 */
router.put('/cambiarContrasenia/:id', validarToken(), usuariosController.cambiarContraseña);  // Cambiar contraseña (protegido)

module.exports = router;
