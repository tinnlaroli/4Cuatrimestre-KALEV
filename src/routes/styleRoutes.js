const express = require('express');
const router = express.Router();
const styleController = require('../controllers/styleController');

/**
 * @swagger
 * tags:
 *   name: Estilos de Aprendizaje
 *   description: Gestión de estilos de aprendizaje para personalizar estrategias educativas.
 */

/**
 * @swagger
 * /styles:
 *   get:
 *     summary: Obtener todos los estilos de aprendizaje
 *     description: Devuelve una lista de todos los estilos de aprendizaje registrados.
 *     tags: [Estilos de Aprendizaje]
 *     responses:
 *       200:
 *         description: Lista de estilos de aprendizaje obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_estilo:
 *                     type: integer
 *                     example: 1
 *                   nombre:
 *                     type: string
 *                     example: Visual
 *                   descripcion:
 *                     type: string
 *                     example: "Aprendizaje basado en materiales gráficos y visuales."
 *       500:
 *         description: Error al obtener los estilos de aprendizaje.
 */
router.get('/', styleController.getEstilos);

/**
 * @swagger
 * /styles/{id}:
 *   get:
 *     summary: Obtener un estilo de aprendizaje por ID
 *     description: Devuelve los datos de un estilo de aprendizaje específico.
 *     tags: [Estilos de Aprendizaje]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del estilo de aprendizaje.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estilo de aprendizaje obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_estilo:
 *                   type: integer
 *                   example: 1
 *                 nombre:
 *                   type: string
 *                   example: Auditivo
 *                 descripcion:
 *                   type: string
 *                   example: "Aprendizaje enfocado en la escucha y la verbalización."
 *       404:
 *         description: Estilo no encontrado.
 *       500:
 *         description: Error al obtener el estilo de aprendizaje.
 */
router.get('/:id', styleController.getEstiloById);

/**
 * @swagger
 * /styles:
 *   post:
 *     summary: Crear un nuevo estilo de aprendizaje
 *     description: Permite registrar un nuevo estilo de aprendizaje en la base de datos.
 *     tags: [Estilos de Aprendizaje]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - descripcion
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del estilo de aprendizaje.
 *                 example: Kinestésico
 *               descripcion:
 *                 type: string
 *                 description: Descripción del estilo de aprendizaje.
 *                 example: "Aprendizaje basado en actividades físicas y prácticas."
 *     responses:
 *       201:
 *         description: Estilo de aprendizaje creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_estilo:
 *                   type: integer
 *                   example: 4
 *                 nombre:
 *                   type: string
 *                   example: Kinestésico
 *                 descripcion:
 *                   type: string
 *                   example: "Aprendizaje basado en actividades físicas y prácticas."
 *       500:
 *         description: Error al crear el estilo de aprendizaje.
 */
router.post('/', styleController.createEstilo);

/**
 * @swagger
 * /styles/{id}:
 *   put:
 *     summary: Actualizar un estilo de aprendizaje existente
 *     description: Permite actualizar los datos de un estilo de aprendizaje específico.
 *     tags: [Estilos de Aprendizaje]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del estilo de aprendizaje.
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
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre actualizado del estilo de aprendizaje.
 *                 example: Visual
 *               descripcion:
 *                 type: string
 *                 description: Descripción actualizada del estilo de aprendizaje.
 *                 example: "Aprendizaje enfocado en el uso de imágenes y gráficos."
 *     responses:
 *       200:
 *         description: Estilo de aprendizaje actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_estilo:
 *                   type: integer
 *                   example: 1
 *                 nombre:
 *                   type: string
 *                   example: Visual
 *                 descripcion:
 *                   type: string
 *                   example: "Aprendizaje enfocado en el uso de imágenes y gráficos."
 *       404:
 *         description: Estilo no encontrado.
 *       500:
 *         description: Error al actualizar el estilo de aprendizaje.
 */
router.put('/:id', styleController.updateEstilo);

/**
 * @swagger
 * /styles/{id}:
 *   delete:
 *     summary: Eliminar un estilo de aprendizaje por ID
 *     description: Permite eliminar un estilo de aprendizaje específico por su ID.
 *     tags: [Estilos de Aprendizaje]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del estilo de aprendizaje.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estilo de aprendizaje eliminado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Estilo eliminado correctamente."
 *       404:
 *         description: Estilo no encontrado.
 *       500:
 *         description: Error al eliminar el estilo de aprendizaje.
 */
router.delete('/:id', styleController.deleteEstilo);

module.exports = router;
