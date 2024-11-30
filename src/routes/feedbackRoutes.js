const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

/**
 * @swagger
 * tags:
 *   name: Feedback
 *   description: Gestión del feedback sobre estrategias de enseñanza y acciones importantes.
 */

/**
 * @swagger
 * /feedback/{id}:
 *   get:
 *     summary: Obtener feedback de un docente
 *     description: Obtiene el feedback de un docente sobre la efectividad de una estrategia de enseñanza.
 *     tags: [Feedback]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la estrategia de enseñanza para obtener el feedback.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Feedback obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_feedback:
 *                   type: integer
 *                   example: 1
 *                 id_estrategia:
 *                   type: integer
 *                   example: 10
 *                 id_docente:
 *                   type: integer
 *                   example: 5
 *                 efectividad:
 *                   type: number
 *                   format: float
 *                   example: 8.5
 *                 comentario:
 *                   type: string
 *                   example: "La estrategia fue efectiva para la mayoría de los alumnos."
 *                 fecha_registro:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-11-30T12:34:56Z"
 *       404:
 *         description: Feedback no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/:id', feedbackController.obtenerFeedback);

/**
 * @swagger
 * /feedback:
 *   post:
 *     summary: Enviar feedback sobre una estrategia
 *     description: Permite a un docente enviar feedback sobre una estrategia de enseñanza.
 *     tags: [Feedback]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_estrategia
 *               - id_docente
 *               - efectividad
 *             properties:
 *               id_estrategia:
 *                 type: integer
 *                 description: ID de la estrategia de enseñanza.
 *               id_docente:
 *                 type: integer
 *                 description: ID del docente que envía el feedback.
 *               efectividad:
 *                 type: number
 *                 format: float
 *                 description: Nivel de efectividad de la estrategia (0 a 10).
 *               comentario:
 *                 type: string
 *                 description: Comentario adicional del docente.
 *     responses:
 *       201:
 *         description: Feedback enviado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_feedback:
 *                   type: integer
 *                   example: 1
 *                 id_estrategia:
 *                   type: integer
 *                   example: 10
 *                 id_docente:
 *                   type: integer
 *                   example: 5
 *                 efectividad:
 *                   type: number
 *                   format: float
 *                   example: 9.0
 *                 comentario:
 *                   type: string
 *                   example: "Fue muy útil para mejorar la participación."
 *                 fecha_registro:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-11-30T12:34:56Z"
 *       400:
 *         description: Solicitud mal formada o datos incompletos.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/', feedbackController.enviarFeedback);

/**
 * @swagger
 * /historial:
 *   get:
 *     summary: Obtener historial de acciones importantes
 *     description: Devuelve un historial de las acciones importantes relacionadas con estrategias y clases.
 *     tags: [Feedback]
 *     responses:
 *       200:
 *         description: Historial de acciones obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_historial:
 *                     type: integer
 *                     example: 1
 *                   accion:
 *                     type: string
 *                     example: "Asignación de estrategia"
 *                   descripcion:
 *                     type: string
 *                     example: "Estrategia asignada a la clase 5A."
 *                   fecha_registro:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-11-30T12:34:56Z"
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/historial', feedbackController.obtenerHistorial);

module.exports = router;
