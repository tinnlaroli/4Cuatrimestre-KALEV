// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     description: Crea un nuevo usuario en la base de datos con la información proporcionada.
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
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id_usuario:
 *                       type: integer
 *                     nombre:
 *                       type: string
 *                     correo:
 *                       type: string
 *                     role:
 *                       type: string
 *       400:
 *         description: Todos los campos son obligatorios.
 *       500:
 *         description: Error al registrar el usuario
 */
router.post('/register', authController.registrarUsuario);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicia sesión de un usuario
 *     description: Autentica a un usuario y genera un token de autenticación.
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
 *         description: Token de autenticación generado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Correo y contraseña son obligatorios.
 *       401:
 *         description: Correo o contraseña incorrectos.
 *       500:
 *         description: Error en el inicio de sesión
 */
router.post('/login', authController.loginUsuario);

module.exports = router;
