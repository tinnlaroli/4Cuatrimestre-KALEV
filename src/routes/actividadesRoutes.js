const express = require('express');
const router = express.Router();
const actividadesController = require('../controllers/actividadesController');
const { validarToken } = require('../middlewares/validarToken');

/**
 * @swagger
 * tags:
 *   name: Actividades
 *   description: Operaciones relacionadas con las actividades académicas.
 */

/**
 * @swagger
 * /actividades:
 *   get:
 *     summary: Obtener todas las actividades
 *     tags: [Actividades]
 *     responses:
 *       200:
 *         description: Lista de actividades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Actividad'
 */
router.get('/actividades', validarToken(), actividadesController.obtenerActividadesController);

/**
 * @swagger
 * /actividades:
 *   post:
 *     summary: Agregar una nueva actividad
 *     tags: [Actividades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Actividad'
 *     responses:
 *       201:
 *         description: Actividad creada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Actividad'
 */
router.post('/actividades', validarToken(), actividadesController.agregarActividadController);

/**
 * @swagger
 * /actividades/{id}:
 *   put:
 *     summary: Actualizar una actividad existente
 *     tags: [Actividades]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la actividad a actualizar
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Actividad'
 *     responses:
 *       200:
 *         description: Actividad actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Actividad'
 */
router.put('/actividades/:id', validarToken(), actividadesController.actualizarActividadController);

/**
 * @swagger
 * /actividades/{id}:
 *   delete:
 *     summary: Eliminar una actividad
 *     tags: [Actividades]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la actividad a eliminar
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Actividad eliminada con éxito
 *       404:
 *         description: Actividad no encontrada
 */
router.delete('/actividades/:id', validarToken(), actividadesController.eliminarActividadController);

module.exports = router;
