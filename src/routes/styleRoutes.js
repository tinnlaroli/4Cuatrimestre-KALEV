const express = require('express');
const router = express.Router();
const styleController = require('../controllers/styleController');

/**
 * @swagger
 * /styles:
 *   get:
 *     summary: "Obtener todos los estilos de aprendizaje"
 *     description: "Devuelve una lista de todos los estilos de aprendizaje registrados."
 *     responses:
 *       200:
 *         description: "Lista de estilos de aprendizaje obtenida exitosamente."
 *       500:
 *         description: "Error al obtener los estilos de aprendizaje."
 */
router.get('/', styleController.getEstilos);

/**
 * @swagger
 * /styles/{id}:
 *   get:
 *     summary: "Obtener un estilo de aprendizaje por ID"
 *     description: "Devuelve los datos de un estilo de aprendizaje específico."
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         required: true
 *         description: "ID del estilo de aprendizaje"
 *         schema:
 *           type: "integer"
 *     responses:
 *       200:
 *         description: "Estilo de aprendizaje obtenido exitosamente."
 *       404:
 *         description: "Estilo no encontrado."
 *       500:
 *         description: "Error al obtener el estilo de aprendizaje."
 */
router.get('/:id', styleController.getEstiloById);

/**
 * @swagger
 * /styles:
 *   post:
 *     summary: "Crear un nuevo estilo de aprendizaje"
 *     description: "Permite registrar un nuevo estilo de aprendizaje."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *     responses:
 *       201:
 *         description: "Estilo de aprendizaje creado exitosamente."
 *       500:
 *         description: "Error al crear el estilo de aprendizaje."
 */
router.post('/', styleController.createEstilo);

/**
 * @swagger
 * /styles/{id}:
 *   put:
 *     summary: "Actualizar un estilo de aprendizaje existente"
 *     description: "Permite actualizar los datos de un estilo de aprendizaje específico."
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         required: true
 *         description: "ID del estilo de aprendizaje"
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
 *                 type: string
 *               descripcion:
 *                 type: string
 *     responses:
 *       200:
 *         description: "Estilo de aprendizaje actualizado exitosamente."
 *       404:
 *         description: "Estilo no encontrado."
 *       500:
 *         description: "Error al actualizar el estilo de aprendizaje."
 */
router.put('/:id', styleController.updateEstilo);

/**
 * @swagger
 * /styles/{id}:
 *   delete:
 *     summary: "Eliminar un estilo de aprendizaje por ID"
 *     description: "Permite eliminar un estilo de aprendizaje específico."
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         required: true
 *         description: "ID del estilo de aprendizaje"
 *         schema:
 *           type: "integer"
 *     responses:
 *       200:
 *         description: "Estilo de aprendizaje eliminado exitosamente."
 *       404:
 *         description: "Estilo no encontrado."
 *       500:
 *         description: "Error al eliminar el estilo de aprendizaje."
 */
router.delete('/:id', styleController.deleteEstilo);

module.exports = router;
