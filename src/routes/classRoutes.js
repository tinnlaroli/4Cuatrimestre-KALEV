const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const validarToken = require('../middlewares/validarToken');

/**
 * @swagger
 * /clases:
 *   post:
 *     summary: Crear una nueva clase
 *     description: Crea una clase con un nombre, descripción y código único.
 *     tags: [Clases]
 *     security:
 *       - BearerAuth: []
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
 *               codigo_unico:
 *                 type: string
 *     responses:
 *       201:
 *         description: Clase creada con éxito
 *       400:
 *         description: Todos los campos son obligatorios
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', validarToken(), classController.crearClase);

/**
 * @swagger
 * /clases:
 *   get:
 *     summary: Obtener todas las clases asignadas al docente autenticado
 *     description: Devuelve una lista de clases asociadas al docente que realiza la solicitud.
 *     tags: [Clases]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clases obtenidas
 *       404:
 *         description: No se encontraron clases para este docente
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', validarToken(), classController.obtenerClases);

/**
 * @swagger
 * /clases/{id}:
 *   get:
 *     summary: Obtener una clase por ID
 *     description: Devuelve los detalles de una clase específica por su ID.
 *     tags: [Clases]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la clase
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Clase obtenida con éxito
 *       404:
 *         description: Clase no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', validarToken(), classController.obtenerClasePorId);

/**
 * @swagger
 * /clases/{id}:
 *   put:
 *     summary: Actualizar una clase por ID
 *     description: Actualiza los detalles de una clase existente por su ID.
 *     tags: [Clases]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la clase
 *         schema:
 *           type: integer
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
 *               codigo_unico:
 *                 type: string
 *     responses:
 *       200:
 *         description: Clase actualizada con éxito
 *       404:
 *         description: Clase no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', validarToken(), classController.actualizarClase);

/**
 * @swagger
 * /clases/{id}:
 *   delete:
 *     summary: Eliminar una clase por ID
 *     description: Elimina una clase específica por su ID.
 *     tags: [Clases]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la clase
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Clase eliminada con éxito
 *       404:
 *         description: Clase no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', validarToken(), classController.eliminarClase);

module.exports = router;
