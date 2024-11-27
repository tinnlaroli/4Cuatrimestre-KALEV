const express = require('express');
const router = express.Router();
const juegosController = require('../controllers/juegosController');
const validarToken = require('../middlewares/validarToken'); // Middleware para validar el token

/**
 * @swagger
 * tags:
 *   name: Juegos
 *   description: Rutas relacionadas con la gestión de juegos
 */

/**
 * @swagger
 * /juegos:
 *   post:
 *     summary: Crear un nuevo juego
 *     description: Permite a un docente crear un nuevo juego asociado a una clase.
 *     tags: [Juegos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - descripcion
 *               - dificultad
 *               - tipo
 *               - clase_id
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del juego
 *               descripcion:
 *                 type: string
 *                 description: Descripción del juego
 *               dificultad:
 *                 type: string
 *                 description: Dificultad del juego
 *               tipo:
 *                 type: string
 *                 description: Tipo de juego (por ejemplo, quiz, rompecabezas)
 *               clase_id:
 *                 type: integer
 *                 description: ID de la clase a la que se asociará el juego
 *     responses:
 *       201:
 *         description: Juego creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_juego:
 *                   type: integer
 *                   description: ID del juego recién creado
 *       400:
 *         description: Faltan datos necesarios para crear el juego
 *       401:
 *         description: Token de autenticación no válido o expirado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /juegos:
 *   get:
 *     summary: Obtener todos los juegos
 *     description: Recupera todos los juegos disponibles.
 *     tags: [Juegos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de juegos encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_juego:
 *                     type: integer
 *                     description: ID del juego
 *                   nombre:
 *                     type: string
 *                     description: Nombre del juego
 *                   descripcion:
 *                     type: string
 *                     description: Descripción del juego
 *                   dificultad:
 *                     type: string
 *                     description: Dificultad del juego
 *                   tipo:
 *                     type: string
 *                     description: Tipo de juego
 *                   clase_id:
 *                     type: integer
 *                     description: ID de la clase a la que pertenece el juego
 *       401:
 *         description: Token de autenticación no válido o expirado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /juegos/{id_juego}:
 *   get:
 *     summary: Obtener un juego por su ID
 *     description: Recupera los detalles de un juego usando su ID.
 *     tags: [Juegos]
 *     parameters:
 *       - in: path
 *         name: id_juego
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del juego
 *     responses:
 *       200:
 *         description: Juego encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_juego:
 *                   type: integer
 *                   description: ID del juego
 *                 nombre:
 *                   type: string
 *                   description: Nombre del juego
 *                 descripcion:
 *                   type: string
 *                   description: Descripción del juego
 *                 dificultad:
 *                   type: string
 *                   description: Dificultad del juego
 *                 tipo:
 *                   type: string
 *                   description: Tipo de juego
 *                 clase_id:
 *                   type: integer
 *                   description: ID de la clase a la que pertenece el juego
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
 *     description: Permite modificar los detalles de un juego ya existente.
 *     tags: [Juegos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_juego
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del juego
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nuevo nombre del juego
 *               descripcion:
 *                 type: string
 *                 description: Nueva descripción del juego
 *               dificultad:
 *                 type: string
 *                 description: Nueva dificultad del juego
 *               tipo:
 *                 type: string
 *                 description: Nuevo tipo de juego
 *               clase_id:
 *                 type: integer
 *                 description: Nuevo ID de la clase asociada
 *     responses:
 *       200:
 *         description: Juego modificado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_juego:
 *                   type: integer
 *                   description: ID del juego modificado
 *       400:
 *         description: Parámetros de entrada inválidos
 *       404:
 *         description: Juego no encontrado
 *       401:
 *         description: Token de autenticación no válido o expirado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /juegos/{id_juego}:
 *   delete:
 *     summary: Eliminar un juego
 *     description: Elimina un juego existente usando su ID.
 *     tags: [Juegos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_juego
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del juego a eliminar
 *     responses:
 *       200:
 *         description: Juego eliminado con éxito
 *       404:
 *         description: Juego no encontrado
 *       401:
 *         description: Token de autenticación no válido o expirado
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
