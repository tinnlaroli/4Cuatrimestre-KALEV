const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');

/**
 * @swagger
 * tags:
 *   name: Recomendaciones
 *   description: Gestión de recomendaciones relacionadas con estilos de aprendizaje.
 */

/**
 * @swagger
 * /recommendations:
 *   get:
 *     summary: Obtener todas las recomendaciones
 *     description: Devuelve una lista de todas las recomendaciones registradas.
 *     tags: [Recomendaciones]
 *     responses:
 *       200:
 *         description: Lista de recomendaciones obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_recomendacion:
 *                     type: integer
 *                     example: 1
 *                   nombre:
 *                     type: string
 *                     example: Recomendación Visual
 *                   descripcion:
 *                     type: string
 *                     example: Usa materiales gráficos para apoyar la enseñanza.
 *                   estilo_aprendizaje:
 *                     type: string
 *                     example: Visual
 *       500:
 *         description: Error al obtener las recomendaciones.
 */
router.get('/', recommendationController.obtenerTodasLasRecomendaciones);

/**
 * @swagger
 * /recommendations/{id}:
 *   get:
 *     summary: Obtener una recomendación por ID
 *     description: Devuelve los detalles de una recomendación específica según su ID.
 *     tags: [Recomendaciones]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la recomendación.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Recomendación obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_recomendacion:
 *                   type: integer
 *                   example: 1
 *                 nombre:
 *                   type: string
 *                   example: Recomendación Auditiva
 *                 descripcion:
 *                   type: string
 *                   example: Usa grabaciones de audio para reforzar conceptos.
 *                 estilo_aprendizaje:
 *                   type: string
 *                   example: Auditivo
 *       404:
 *         description: Recomendación no encontrada.
 *       500:
 *         description: Error al obtener la recomendación.
 */
router.get('/:id', recommendationController.obtenerRecomendacionPorId);

/**
 * @swagger
 * /recommendations:
 *   post:
 *     summary: Crear una nueva recomendación
 *     description: Permite crear una nueva recomendación relacionada con un estilo de aprendizaje.
 *     tags: [Recomendaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - descripcion
 *               - estilo_aprendizaje
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre de la recomendación.
 *                 example: Recomendación Kinestésica
 *               descripcion:
 *                 type: string
 *                 description: Descripción de la recomendación.
 *                 example: Fomenta actividades físicas para reforzar conceptos.
 *               estilo_aprendizaje:
 *                 type: string
 *                 description: Estilo de aprendizaje asociado.
 *                 example: Kinestésico
 *     responses:
 *       201:
 *         description: Recomendación creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_recomendacion:
 *                   type: integer
 *                   example: 1
 *                 nombre:
 *                   type: string
 *                   example: Recomendación Lecto-Escritora
 *                 descripcion:
 *                   type: string
 *                   example: Promueve la lectura y escritura para aprender.
 *                 estilo_aprendizaje:
 *                   type: string
 *                   example: Lecto-Escritor
 *       500:
 *         description: Error al crear la recomendación.
 */
router.post('/', recommendationController.crearRecomendacion);

/**
 * @swagger
 * /recommendations/{id}:
 *   put:
 *     summary: Actualizar una recomendación existente
 *     description: Permite actualizar los datos de una recomendación específica.
 *     tags: [Recomendaciones]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la recomendación a actualizar.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - descripcion
 *               - estilo_aprendizaje
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre actualizado de la recomendación.
 *               descripcion:
 *                 type: string
 *                 description: Descripción actualizada de la recomendación.
 *               estilo_aprendizaje:
 *                 type: string
 *                 description: Estilo de aprendizaje asociado.
 *     responses:
 *       200:
 *         description: Recomendación actualizada exitosamente.
 *       404:
 *         description: Recomendación no encontrada.
 *       500:
 *         description: Error al actualizar la recomendación.
 */
router.put('/:id', recommendationController.actualizarRecomendacion);

/**
 * @swagger
 * /recommendations/{id}:
 *   delete:
 *     summary: Eliminar una recomendación por ID
 *     description: Permite eliminar una recomendación específica.
 *     tags: [Recomendaciones]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la recomendación a eliminar.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Recomendación eliminada exitosamente.
 *       404:
 *         description: Recomendación no encontrada.
 *       500:
 *         description: Error al eliminar la recomendación.
 */
router.delete('/:id', recommendationController.eliminarRecomendacion);

module.exports = router;
