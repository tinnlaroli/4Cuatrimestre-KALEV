const express = require('express');
const router = express.Router();
const juegosController = require('../controllers/juegosController');
const validarToken = require('../middlewares/validarToken'); // Middleware para validar el token

/**
 * @swagger
 * tags:
 *   name: Juegos
 *   description: Endpoints para la gestión de juegos
 */

/**
 * @swagger
 * /juegos:
 *   post:
 *     summary: Crear un nuevo juego
 *     security:
 *       - BearerAuth: []
 *     tags: [Juegos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del juego
 *               descripcion:
 *                 type: string
 *                 description: Descripción del juego
 *               dificultad:
 *                 type: string
 *                 description: Nivel de dificultad del juego
 *               categoria:
 *                 type: string
 *                 description: Categoría del juego
 *     responses:
 *       201:
 *         description: Juego creado exitosamente
 *       400:
 *         description: Error en los datos proporcionados
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /juegos:
 *   get:
 *     summary: Obtener todos los juegos
 *     security:
 *       - BearerAuth: []
 *     tags: [Juegos]
 *     responses:
 *       200:
 *         description: Lista de juegos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID del juego
 *                   nombre:
 *                     type: string
 *                     description: Nombre del juego
 *                   descripcion:
 *                     type: string
 *                   dificultad:
 *                     type: string
 *                   categoria:
 *                     type: string
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /juegos/{id_juego}:
 *   get:
 *     summary: Obtener un juego por su ID
 *     security:
 *       - BearerAuth: []
 *     tags: [Juegos]
 *     parameters:
 *       - in: path
 *         name: id_juego
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del juego
 *     responses:
 *       200:
 *         description: Juego encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID del juego
 *                 nombre:
 *                   type: string
 *                 descripcion:
 *                   type: string
 *                 dificultad:
 *                   type: string
 *                 categoria:
 *                   type: string
 *       404:
 *         description: Juego no encontrado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /juegos/{id_juego}:
 *   put:
 *     summary: Modificar un juego
 *     security:
 *       - BearerAuth: []
 *     tags: [Juegos]
 *     parameters:
 *       - in: path
 *         name: id_juego
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del juego
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               dificultad:
 *                 type: string
 *               categoria:
 *                 type: string
 *     responses:
 *       200:
 *         description: Juego actualizado exitosamente
 *       404:
 *         description: Juego no encontrado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /juegos/{id_juego}:
 *   delete:
 *     summary: Eliminar un juego
 *     security:
 *       - BearerAuth: []
 *     tags: [Juegos]
 *     parameters:
 *       - in: path
 *         name: id_juego
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del juego
 *     responses:
 *       200:
 *         description: Juego eliminado exitosamente
 *       404:
 *         description: Juego no encontrado
 *       500:
 *         description: Error interno del servidor
 */

// Crear un nuevo juego
router.post('/juegos', validarToken(), juegosController.crearJuego);

// Obtener todos los juegos
router.get('/juegos', validarToken(), juegosController.obtenerJuegos);

// Obtener un juego por su ID
router.get('/juegos/:id_juego', validarToken(), juegosController.obtenerJuegoPorId);

// Modificar un juego
router.put('/juegos/:id_juego', validarToken(), juegosController.modificarJuego);

// Eliminar un juego
router.delete('/juegos/:id_juego', validarToken(), juegosController.eliminarJuego);

module.exports = router;
