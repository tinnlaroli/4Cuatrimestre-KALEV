// clases.js
const express = require('express');
const router = express.Router();
const estudiantesController = require('../controllers/estudiantesController');

/**
 * @swagger
 * /estudiantes/{id_estudiante}/clases:
 *   get:
 *     summary: Obtener todas las clases en las que un estudiante está inscrito
 *     description: Obtiene todas las clases en las que un estudiante está inscrito, especificando su ID.
 *     tags: [Estudiantes]
 *     parameters:
 *       - in: path
 *         name: id_estudiante
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del estudiante
 *     responses:
 *       200:
 *         description: Clases del estudiante obtenidas con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_clase:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *                   descripcion:
 *                     type: string
 *       404:
 *         description: Estudiante no encontrado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /estudiantes/{id_clase}/estudiantes:
 *   get:
 *     summary: Obtener estudiantes de una clase
 *     description: Obtiene una lista de todos los estudiantes inscritos en una clase especificada por su ID.
 *     tags: [Estudiantes]
 *     parameters:
 *       - in: path
 *         name: id_clase
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la clase
 *     responses:
 *       200:
 *         description: Lista de estudiantes de la clase obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_estudiante:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *                   correo:
 *                     type: string
 *       404:
 *         description: Clase no encontrada
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /estudiantes/{id_docente}/clases:
 *   get:
 *     summary: Obtener todas las clases de un docente
 *     description: Obtiene todas las clases en las que un docente está inscrito, especificando su ID.
 *     tags: [Estudiantes]
 *     parameters:
 *       - in: path
 *         name: id_docente
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del docente
 *     responses:
 *       200:
 *         description: Clases del docente obtenidas con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_clase:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *                   descripcion:
 *                     type: string
 *       404:
 *         description: Docente no encontrado
 *       500:
 *         description: Error interno del servidor
 */

// Obtener todas las clases en las que un estudiante está inscrito
router.get('/:id_estudiante/clases', estudiantesController.obtenerClasesPorEstudiante);

// Obtener estudiantes de una clase
router.get('/:id_clase/estudiantes', estudiantesController.obtenerEstudiantesPorClase);

// Obtener todas las clases de un docente
router.get('/:id_docente/clases', estudiantesController.obtenerClasesPorDocente);

module.exports = router;
