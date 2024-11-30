const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/userController');
const validarToken = require('../middlewares/validarToken');

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Gestión de usuarios (docentes, directores, tutores).
 */

/**
 * @swagger
 * /usuarios/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Permite registrar un nuevo usuario en el sistema.
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - correo
 *               - password
 *               - role
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del usuario.
 *                 example: Juan Pérez
 *               correo:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *                 example: juan.perez@example.com
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *                 example: password123
 *               role:
 *                 type: string
 *                 description: Rol del usuario.
 *                 enum: [docente, director, tutor]
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito.
 *       400:
 *         description: Campos faltantes o correo ya registrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/usuarios/register', usuarioController.registrarUsuario);

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Permite iniciar sesión y obtener un token de autenticación.
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - correo
 *               - password
 *             properties:
 *               correo:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *                 example: juan.perez@example.com
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *                 example: password123
 *     responses:
 *       200:
 *         description: Token de autenticación generado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token de autenticación.
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Campos faltantes.
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
 *     summary: Obtener detalles de un usuario
 *     description: Devuelve los detalles de un usuario específico según su ID.
 *     tags: [Usuarios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario.
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Detalles del usuario obtenidos con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_usuario:
 *                   type: integer
 *                   example: 1
 *                 nombre:
 *                   type: string
 *                   example: Juan Pérez
 *                 correo:
 *                   type: string
 *                   example: juan.perez@example.com
 *                 role:
 *                   type: string
 *                   example: docente
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
 *     summary: Actualizar un usuario
 *     description: Permite actualizar los datos de un usuario existente.
 *     tags: [Usuarios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario.
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Juan Pérez Actualizado
 *               correo:
 *                 type: string
 *                 example: juan.perez@example.com
 *               role:
 *                 type: string
 *                 enum: [docente, director, tutor]
 *     responses:
 *       200:
 *         description: Usuario actualizado con éxito.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.put('/usuarios/:id', validarToken(), usuarioController.actualizarUsuario);

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     description: Permite eliminar un usuario por su ID.
 *     tags: [Usuarios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario.
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario eliminado con éxito.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete('/usuarios/:id', validarToken(), usuarioController.eliminarUsuario);

module.exports = router;
