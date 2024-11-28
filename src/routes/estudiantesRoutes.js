const express = require('express');
const router = express.Router();
const estudiantesController = require('../controllers/estudiantesController');

/**
 * @swagger
 * /estudiantes/{id_estudiante}/clases:
 *   get:
 *     summary: Obtener todas las clases en las que un estudiante está inscrito
 *     description: Permite obtener la lista de todas las clases a las que un estudiante está inscrito. Requiere token de autenticación.
 *     tags: [Estudiantes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id_estudiante
 *         in: path
 *         required: true
 *         description: ID del estudiante para obtener sus clases.
 *         schema:
 *           type: integer
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
 *       404:
 *         description: Estudiante no encontrado o no tiene clases asignadas.
 *       500:
 *         description: Error interno del servidor.
 */

/**
 * @swagger
 * /estudiantes/clases/{id_clase}:
 *   get:
 *     summary: Obtener estudiantes de una clase
 *     description: Permite obtener la lista de estudiantes inscritos en una clase específica. Requiere token de autenticación.
 *     tags: [Estudiantes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id_clase
 *         in: path
 *         required: true
 *         description: ID de la clase para obtener sus estudiantes.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de estudiantes obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_estudiante:
 *                     type: integer
 *                   nombre_estudiante:
 *                     type: string
 *                   edad:
 *                     type: integer
 *       401:
 *         description: Token de autenticación no válido o no proporcionado.
 *       404:
 *         description: Clase no encontrada o no tiene estudiantes inscritos.
 *       500:
 *         description: Error interno del servidor.
 */

/**
 * @swagger
 * /estudiantes/docentes/{id_docente}/clases:
 *   get:
 *     summary: Obtener todas las clases de un docente
 *     description: Permite obtener la lista de todas las clases impartidas por un docente. Requiere token de autenticación.
 *     tags: [Estudiantes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id_docente
 *         in: path
 *         required: true
 *         description: ID del docente para obtener sus clases.
 *         schema:
 *           type: integer
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
 *       404:
 *         description: Docente no encontrado o no tiene clases asignadas.
 *       500:
 *         description: Error interno del servidor.
 */

// Obtener todas las clases en las que un estudiante está inscrito
router.get('/:id_estudiante/clases', estudiantesController.obtenerClasesPorEstudiante);

// Obtener estudiantes de una clase
router.get('/clases/:id_clase', estudiantesController.obtenerEstudiantesPorClase);

// Obtener todas las clases de un docente
router.get('/docentes/:id_docente/clases', estudiantesController.obtenerClasesPorDocente);

module.exports = router;
