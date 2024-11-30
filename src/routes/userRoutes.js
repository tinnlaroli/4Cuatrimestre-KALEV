const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/userController');
const validarToken = require('../middlewares/validarToken');

/**
 * @swagger
 * /usuarios/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Permite registrar un nuevo usuario (docente, director, tutor).
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
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [docente, director, tutor]
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito.
 *       400:
 *         description: Campos faltantes o incorrectos.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/usuarios/register', usuarioController.registrarUsuario);

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Iniciar sesión de un usuario
 *     description: Permite a un usuario iniciar sesión y obtener un token de autenticación.
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
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token de autenticación generado.
 *       401:
 *         description: Credenciales inválidas.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/usuarios/login', usuarioController.loginUsuario);

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Obtener detalles de un usuario por ID
 *     description: Permite obtener información de un usuario específico.
 *     tags: [Usuarios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario a obtener.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Información del usuario obtenida con éxito.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/usuarios/:id', validarToken(), usuarioController.obtenerUsuario);

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Actualizar información de un usuario
 *     description: Permite actualizar los datos de un usuario por su ID.
 *     tags: [Usuarios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario a actualizar.
 *         schema:
 *           type: integer
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
 *               role:
 *                 type: string
 *                 enum: [docente, director, tutor]
 *     responses:
 *        200:
 *          description: Usuario actualizado con éxito.
 *        404:
 *          description: Usuario no encontrado.
 *        500:
 *          description: Error interno del servidor.
 */
router.put('/usuarios/:id', validarToken(), usuarioController.actualizarUsuario);

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     description: Permite eliminar un usuario específico por su ID.
 *     tags: [Usuarios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario a eliminar.
 *         schema:
 *           type: integer
 *     responses:
 *        200:
 *          description: Usuario eliminado con éxito.
 *        404:
 *          description: Usuario no encontrado.
 *        500:
 *          description: Error interno del servidor.
 */
router.delete('/usuarios/:id', validarToken(), usuarioController.eliminarUsuario);

module.exports = router;
