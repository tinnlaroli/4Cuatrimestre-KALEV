const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

/**
 * @swagger
 * /feedback/{id}:
 *   get:
 *     summary: "Obtener feedback de un docente sobre la efectividad de una estrategia de enseñanza"
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID de la estrategia de enseñanza para obtener el feedback."
 *         required: true
 *         type: "integer"
 *     responses:
 *       200:
 *         description: "Feedback obtenido exitosamente"
 *         schema:
 *           type: "object"
 *           properties:
 *             id_feedback:
 *               type: "integer"
 *             id_estrategia:
 *               type: "integer"
 *             id_docente:
 *               type: "integer"
 *             efectividad:
 *               type: "number"
 *               format: "float"
 *             comentario:
 *               type: "string"
 *             fecha_registro:
 *               type: "string"
 *               format: "date-time"
 *       404:
 *         description: "Feedback no encontrado"
 *       500:
 *         description: "Error interno del servidor"
 */
router.get('/feedback/:id', feedbackController.obtenerFeedback);

/**
 * @swagger
 * /feedback:
 *   post:
 *     summary: "Enviar feedback sobre una estrategia de enseñanza"
 *     parameters:
 *       - in: "body"
 *         name: "body"
 *         description: "Datos de feedback a enviar"
 *         required: true
 *         schema:
 *           type: "object"
 *           properties:
 *             id_estrategia:
 *               type: "integer"
 *             id_docente:
 *               type: "integer"
 *             efectividad:
 *               type: "number"
 *               format: "float"
 *             comentario:
 *               type: "string"
 *     responses:
 *       201:
 *         description: "Feedback enviado exitosamente"
 *         schema:
 *           type: "object"
 *           properties:
 *             id_feedback:
 *               type: "integer"
 *             id_estrategia:
 *               type: "integer"
 *             id_docente:
 *               type: "integer"
 *             efectividad:
 *               type: "number"
 *               format: "float"
 *             comentario:
 *               type: "string"
 *             fecha_registro:
 *               type: "string"
 *               format: "date-time"
 *       400:
 *         description: "Solicitud mal formada o datos incompletos"
 *       500:
 *         description: "Error interno del servidor"
 */
router.post('/feedback', feedbackController.enviarFeedback);

/**
 * @swagger
 * /historial:
 *   get:
 *     summary: "Obtener el historial de acciones importantes"
 *     responses:
 *       200:
 *         description: "Historial de acciones obtenido exitosamente"
 *         schema:
 *           type: "array"
 *           items:
 *             type: "object"
 *             properties:
 *               id_historial:
 *                 type: "integer"
 *               accion:
 *                 type: "string"
 *               descripcion:
 *                 type: "string"
 *               fecha_registro:
 *                 type: "string"
 *                 format: "date-time"
 *       500:
 *         description: "Error interno del servidor"
 */
router.get('/historial', feedbackController.obtenerHistorial);

module.exports = router;
