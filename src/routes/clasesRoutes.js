const express = require('express');
const router = express.Router();
const clasesController = require('../controllers/clasesController');
const validarToken = require('../middlewares/validarToken');

/**
 * @swagger
 * /:
 *   post:
 *     summary: Crear una nueva clase
 *     description: Permite al docente crear una nueva clase. Requiere token de autenticación.
 *     tags: [Clases]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_clase:
 *                 type: string
 *               nivel:
 *                 type: string
 *               descripcion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Clase creada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_clase:
 *                   type: integer
 *                 nombre_clase:
 *                   type: string
 *                 nivel:
 *                   type: string
 *       401:
 *         description: Token de autenticación no válido o no proporcionado.
 *       500:
 *         description: Error interno del servidor.
 */

/**
 * @swagger
 * /{codigo_clase}:
 *   get:
 *     summary: Obtener una clase por su código
 *     description: Permite obtener los detalles de una clase específica por su código. No requiere autenticación.
 *     tags: [Clases]
 *     parameters:
 *       - name: codigo_clase
 *         in: path
 *         required: true
 *         description: Código único de la clase.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Clase obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_clase:
 *                   type: integer
 *                 nombre_clase:
 *                   type: string
 *                 nivel:
 *                   type: string
 *                 descripcion:
 *                   type: string
 *       404:
 *         description: Clase no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Obtener todas las clases de un docente
 *     description: Permite al docente obtener todas las clases que imparte. Requiere token de autenticación.
 *     tags: [Clases]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clases obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_clase:
 *                     type: integer
 *                   nombre_clase:
 *                     type: string
 *                   nivel:
 *                     type: string
 *       401:
 *         description: Token de autenticación no válido o no proporcionado.
 *       500:
 *         description: Error interno del servidor.
 */

/**
 * @swagger
 * /unirse:
 *   post:
 *     summary: Unirse a una clase con el código
 *     description: Permite a un estudiante unirse a una clase con el código correspondiente. Requiere token de autenticación.
 *     tags: [Clases]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigo_clase:
 *                 type: string
 *     responses:
 *       200:
 *         description: Unión a la clase realizada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Te has unido a la clase con éxito."
 *       401:
 *         description: Token de autenticación no válido o no proporcionado.
 *       404:
 *         description: Clase no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */

// Crear una nueva clase (solo docente)
router.post('/', validarToken(), clasesController.crearClase);

// Obtener una clase por su código
router.get('/:codigo_clase', clasesController.obtenerClasePorCodigo);

// Obtener todas las clases de un docente
router.get('/', validarToken(), clasesController.obtenerClasesPorDocente);

// Unirse a una clase con el código
router.post('/unirse', validarToken(), clasesController.unirseAClase);

module.exports = router;
