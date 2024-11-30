const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validarToken = require('../middlewares/validarToken');

/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Endpoints para registro e inicio de sesión de usuarios.
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     description: Crea un nuevo usuario (docente, director o tutor) en la base de datos con la información proporcionada.
 *     tags: [Autenticación]
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
 *               correo:
 *                 type: string
 *                 description: Correo electrónico único del usuario.
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *               role:
 *                 type: string
 *                 description: Rol del usuario. Puede ser 'docente', 'director' o 'tutor'.
 *                 enum: [docente, director, tutor]
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito.
 *       400:
 *         description: Todos los campos son obligatorios.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/register', authController.registrarUsuario);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicia sesión de un usuario
 *     description: Autentica a un usuario y genera un token de autenticación.
 *     tags: [Autenticación]
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
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *     responses:
 *       200:
 *         description: Token de autenticación generado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *       400:
 *         description: Correo y contraseña son obligatorios.
 *       401:
 *         description: Correo o contraseña incorrectos.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/login', authController.loginUsuario);

/**
 * @swagger
 * /auth/validate:
 *   get:
 *     summary: Valida el token JWT
 *     description: Verifica si el token JWT enviado en los encabezados es válido.
 *     tags: [Autenticación]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token válido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token válido.
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id_usuario:
 *                       type: integer
 *                       example: 1
 *                     role:
 *                       type: string
 *                       example: docente
 *       401:
 *         description: Token no válido o expirado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/validate', validarToken(), authController.validarToken);

module.exports = router;
