const express = require('express');
const router = express.Router();
const clasesController = require('../controllers/clasesController');
const validarToken = require('../middlewares/validarToken');


/**
 * @swagger
 * tags:
 *   name: Clases
 *   description: Gestión de clases
 */

/**
 * @swagger
 * /api/clases:
 *   post:
 *     summary: Crear una nueva clase (solo docente)
 *     tags: [Clases]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_clase:
 *                 type: string
 *               descripcion_clase:
 *                 type: string
 *               codigo_clase:
 *                 type: string
 *               id_docente:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Clase creada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_clase:
 *                   type: integer
 *                 nombre_clase:
 *                   type: string
 *                 descripcion_clase:
 *                   type: string
 *                 codigo_clase:
 *                   type: string
 *                 id_docente:
 *                   type: integer
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error al crear la clase
 */

/**
 * @swagger
 * /api/clases/{codigo_clase}:
 *   get:
 *     summary: Obtener una clase por su código
 *     tags: [Clases]
 *     parameters:
 *       - name: codigo_clase
 *         in: path
 *         description: Código de la clase
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Clase obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_clase:
 *                   type: integer
 *                 nombre_clase:
 *                   type: string
 *                 descripcion_clase:
 *                   type: string
 *                 codigo_clase:
 *                   type: string
 *                 id_docente:
 *                   type: integer
 *       404:
 *         description: Clase no encontrada
 *       500:
 *         description: Error al obtener la clase
 */

/**
 * @swagger
 * /api/clases:
 *   get:
 *     summary: Obtener todas las clases de un docente
 *     tags: [Clases]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Clases obtenidas con éxito
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
 *                   codigo_clase:
 *                     type: string
 *                   descripcion_clase:
 *                     type: string
 *                   id_docente:
 *                     type: integer
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error al obtener las clases del docente
 */

/**
 * @swagger
 * /api/clases/unirse:
 *   post:
 *     summary: Unirse a una clase con el código
 *     tags: [Clases]
 *     security:
 *       - bearerAuth: []
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
 *         description: Estudiante se unió a la clase con éxito
 *       400:
 *         description: Error al unirse a la clase
 *       500:
 *         description: Error en la petición
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
