const express = require('express');
const router = express.Router();
const juegosController = require('../controllers/juegosController');
const validarToken = require('../middlewares/validarToken'); // Middleware para validar el token

/**
 * @swagger
 * /juegos:
 *   post:
 *     summary: Crear un nuevo juego
 *     description: Permite a un docente crear un nuevo juego para la plataforma. Requiere token de autenticación.
 *     tags: [Juegos]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       description: Datos necesarios para crear un nuevo juego.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Juego de Matemáticas"
 *               descripcion:
 *                 type: string
 *                 example: "Un juego interactivo para practicar operaciones matemáticas."
 *               tipo:
 *                 type: string
 *                 enum: ["puzzle", "preguntas", "rompecabezas", "quiz"]
 *                 example: "preguntas"
 *     responses:
 *       201:
 *         description: Juego creado exitosamente.
 *       401:
 *         description: Token de autenticación no válido o no proporcionado.
 *       500:
 *         description: Error interno del servidor.
 */

/**
 * @swagger
 * /juegos:
 *   get:
 *     summary: Obtener todos los juegos
 *     description: Obtiene la lista de todos los juegos disponibles en la plataforma. Requiere token de autenticación.
 *     tags: [Juegos]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de juegos obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_juego:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *                   descripcion:
 *                     type: string
 *                   tipo:
 *                     type: string
 *       401:
 *         description: Token de autenticación no válido o no proporcionado.
 *       500:
 *         description: Error interno del servidor.
 */

/**
 * @swagger
 * /juegos/{id_juego}:
 *   get:
 *     summary: Obtener un juego por su ID
 *     description: Obtiene los detalles de un juego específico a través de su ID. Requiere token de autenticación.
 *     tags: [Juegos]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id_juego
 *         in: path
 *         required: true
 *         description: ID del juego que se desea obtener.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalles del juego obtenidos con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_juego:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 descripcion:
 *                   type: string
 *                 tipo:
 *                   type: string
 *       401:
 *         description: Token de autenticación no válido o no proporcionado.
 *       404:
 *         description: Juego no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */

/**
 * @swagger
 * /juegos/{id_juego}:
 *   put:
 *     summary: Modificar un juego
 *     description: Permite a un docente modificar los detalles de un juego existente. Requiere token de autenticación.
 *     tags: [Juegos]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id_juego
 *         in: path
 *         required: true
 *         description: ID del juego que se desea modificar.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       description: Datos actualizados para el juego.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Juego de Matemáticas Avanzado"
 *               descripcion:
 *                 type: string
 *                 example: "Juego mejorado para practicar operaciones avanzadas."
 *               tipo:
 *                 type: string
 *                 enum: ["puzzle", "preguntas", "rompecabezas", "quiz"]
 *                 example: "rompecabezas"
 *     responses:
 *       200:
 *         description: Juego modificado exitosamente.
 *       401:
 *         description: Token de autenticación no válido o no proporcionado.
 *       404:
 *         description: Juego no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */

/**
 * @swagger
 * /juegos/{id_juego}:
 *   delete:
 *     summary: Eliminar un juego
 *     description: Permite a un docente eliminar un juego específico de la plataforma. Requiere token de autenticación.
 *     tags: [Juegos]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id_juego
 *         in: path
 *         required: true
 *         description: ID del juego que se desea eliminar.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Juego eliminado exitosamente.
 *       401:
 *         description: Token de autenticación no válido o no proporcionado.
 *       404:
 *         description: Juego no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */


// Crear un nuevo juego
router.post('/', validarToken(), juegosController.crearJuego);

// Obtener todos los juegos
router.get('/', validarToken(), juegosController.obtenerJuegos);

// Obtener un juego por su ID
router.get('/:id_juego', validarToken(), juegosController.obtenerJuegoPorId);

// Modificar un juego
router.put('/:id_juego', validarToken(), juegosController.modificarJuego);

// Eliminar un juego
router.delete('/:id_juego', validarToken(), juegosController.eliminarJuego);

module.exports = router;
