const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');

/**
 * @swagger
 * /recommendations:
 *   get:
 *     summary: "Obtener todas las recomendaciones"
 *     description: "Devuelve una lista de todas las recomendaciones registradas."
 *     responses:
 *       200:
 *         description: "Lista de recomendaciones obtenida exitosamente"
 *       500:
 *         description: "Error al obtener las recomendaciones"
 */
router.get('/', recommendationController.obtenerTodasLasRecomendaciones);

/**
 * @swagger
 * /recommendations/{id}:
 *   get:
 *     summary: "Obtener una recomendación por ID"
 *     description: "Devuelve la recomendación con el ID especificado."
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         required: true
 *         description: "ID de la recomendación"
 *         schema:
 *           type: "integer"
 *     responses:
 *       200:
 *         description: "Recomendación obtenida exitosamente"
 *       404:
 *         description: "Recomendación no encontrada"
 *       500:
 *         description: "Error al obtener la recomendación"
 */
router.get('/:id', recommendationController.obtenerRecomendacionPorId);

/**
 * @swagger
 * /recommendations:
 *   post:
 *     summary: "Crear una nueva recomendación"
 *     description: "Permite crear una nueva recomendación."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: "string"
 *               descripcion:
 *                 type: "string"
 *               estilo_aprendizaje:
 *                 type: "string"
 *     responses:
 *       201:
 *         description: "Recomendación creada exitosamente"
 *       500:
 *         description: "Error al crear la recomendación"
 */
router.post('/', recommendationController.crearRecomendacion);

/**
 * @swagger
 * /recommendations/{id}:
 *   put:
 *     summary: "Actualizar una recomendación existente"
 *     description: "Permite actualizar los datos de una recomendación."
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         required: true
 *         description: "ID de la recomendación"
 *         schema:
 *           type: "integer"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: "string"
 *               descripcion:
 *                 type: "string"
 *               estilo_aprendizaje:
 *                 type: "string"
 *     responses:
 *       200:
 *         description: "Recomendación actualizada exitosamente"
 *       404:
 *         description: "Recomendación no encontrada"
 *       500:
 *         description: "Error al actualizar la recomendación"
 */
router.put('/:id', recommendationController.actualizarRecomendacion);

/**
 * @swagger
 * /recommendations/{id}:
 *   delete:
 *     summary: "Eliminar una recomendación por ID"
 *     description: "Permite eliminar una recomendación existente."
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         required: true
 *         description: "ID de la recomendación"
 *         schema:
 *           type: "integer"
 *     responses:
 *       200:
 *         description: "Recomendación eliminada exitosamente"
 *       404:
 *         description: "Recomendación no encontrada"
 *       500:
 *         description: "Error al eliminar la recomendación"
 */
router.delete('/:id', recommendationController.eliminarRecomendacion);

module.exports = router;
