// clases.js
const express = require('express');
const router = express.Router();
const estudiantesController = require('../controllers/estudiantesController');
/**
 * @swagger
 * tags:
 *   name: Estudiantes
 *   description: Gestión de estudiantes 
 */

/**
 * @swagger
 * /api/estudiantes/{id_estudiante}/clases:
 *   get:
 *     summary: Obtener todas las clases en las que un estudiante está inscrito
 *     tags: [Estudiantes]
 *     parameters:
 *       - name: id_estudiante
 *         in: path
 *         description: ID del estudiante
 *         required: true
 *         schema:
 *           type: integer
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
 *       500:
 *         description: Error al obtener las clases
 */

/**
 * @swagger
 * /api/clases/{id_clase}/estudiantes:
 *   get:
 *     summary: Obtener todos los estudiantes de una clase
 *     tags: [Estudiantes]
 *     parameters:
 *       - name: id_clase
 *         in: path
 *         description: ID de la clase
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estudiantes obtenidos con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_usuario:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *                   correo:
 *                     type: string
 *       500:
 *         description: Error al obtener los estudiantes
 */

/**
 * @swagger
 * /api/estudiantes/{id_docente}/clases:
 *   get:
 *     summary: Obtener todas las clases de un docente
 *     tags: [Estudiantes]
 *     parameters:
 *       - name: id_docente
 *         in: path
 *         description: ID del docente
 *         required: true
 *         schema:
 *           type: integer
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
 *                   nombre_clase:
 *                     type: string
 *                   codigo_clase:
 *                     type: string
 *       500:
 *         description: Error al obtener las clases del docente
 */

// Obtener todas las clases en las que un estudiante está inscrito
router.get('/:id_estudiante/clases', estudiantesController.obtenerClasesPorEstudiante);

// Obtener estudiantes de una clase
router.get('/:id_clase/estudiantes', estudiantesController.obtenerEstudiantesPorClase);

// Obtener todas las clases de un docente
router.get('/:id_docente/clases', estudiantesController.obtenerClasesPorDocente);

module.exports = router;