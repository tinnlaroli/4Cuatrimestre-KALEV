// clases.js
const express = require('express');
const router = express.Router();
const estudiantesController = require('../controllers/estudiantesController');

/**
 * @swagger
 * tags:
 *   name: Clases
 *   description: Endpoints relacionados con clases y estudiantes
 */

/**
 * @swagger
 * /{id_estudiante}/clases:
 *   get:
 *     summary: Obtener todas las clases en las que un estudiante está inscrito
 *     security:
 *       - BearerAuth: []
 *     tags: [Clases]
 *     parameters:
 *       - in: path
 *         name: id_estudiante
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del estudiante
 *     responses:
 *       200:
 *         description: Lista de clases en las que el estudiante está inscrito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_clase:
 *                     type: string
 *                     description: ID de la clase
 *                   nombre_clase:
 *                     type: string
 *                     description: Nombre de la clase
 *       404:
 *         description: Estudiante no encontrado o sin clases inscritas
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /{id_clase}/estudiantes:
 *   get:
 *     summary: Obtener estudiantes de una clase
 *     security:
 *       - BearerAuth: []
 *     tags: [Clases]
 *     parameters:
 *       - in: path
 *         name: id_clase
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la clase
 *     responses:
 *       200:
 *         description: Lista de estudiantes inscritos en la clase
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_estudiante:
 *                     type: string
 *                     description: ID del estudiante
 *                   nombre_estudiante:
 *                     type: string
 *                     description: Nombre del estudiante
 *       404:
 *         description: Clase no encontrada o sin estudiantes
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /{id_docente}/clases:
 *   get:
 *     summary: Obtener todas las clases de un docente
 *     security:
 *       - BearerAuth: []
 *     tags: [Clases]
 *     parameters:
 *       - in: path
 *         name: id_docente
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del docente
 *     responses:
 *       200:
 *         description: Lista de clases asignadas al docente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_clase:
 *                     type: string
 *                     description: ID de la clase
 *                   nombre_clase:
 *                     type: string
 *                     description: Nombre de la clase
 *       404:
 *         description: Docente no encontrado o sin clases asignadas
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
