const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const validarToken = require('../middlewares/validarToken');

/**
 * @swagger
 * tags:
 *   name: Clases
 *   description: Gestión de clases asignadas a los docentes.
 */

/**
 * @swagger
 * /clases:
 *   post:
 *     summary: Crear una nueva clase
 *     description: Permite a un docente crear una nueva clase con un nombre, descripción y código único.
 *     tags: [Clases]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - descripcion
 *               - codigo_unico
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre de la clase.
 *               descripcion:
 *                 type: string
 *                 description: Descripción breve de la clase.
 *               codigo_unico:
 *                 type: string
 *                 description: Código único para identificar la clase.
 *     responses:
 *       201:
 *         description: Clase creada con éxito.
 *       400:
 *         description: Campos obligatorios faltantes.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/', validarToken(), classController.crearClase);

/**
 * @swagger
 * /clases:
 *   get:
 *     summary: Obtener todas las clases del docente autenticado
 *     description: Devuelve una lista de clases asociadas al docente autenticado.
 *     tags: [Clases]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clases obtenida con éxito.
 *       404:
 *         description: No se encontraron clases para este docente.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/', validarToken(), classController.obtenerClases);

/**
 * @swagger
 * /clases/{id}:
 *   get:
 *     summary: Obtener detalles de una clase por ID
 *     description: Devuelve los detalles de una clase específica según su ID.
 *     tags: [Clases]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la clase a consultar.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalles de la clase obtenidos con éxito.
 *       404:
 *         description: Clase no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/:id', validarToken(), classController.obtenerClasePorId);

/**
 * @swagger
 * /clases/{id}:
 *   put:
 *     summary: Actualizar una clase por ID
 *     description: Permite actualizar el nombre, descripción o código único de una clase específica.
 *     tags: [Clases]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la clase a actualizar.
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
 *               - codigo_unico
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre actualizado de la clase.
 *               descripcion:
 *                 type: string
 *                 description: Descripción actualizada de la clase.
 *               codigo_unico:
 *                 type: string
 *                 description: Código único actualizado de la clase.
 *     responses:
 *       200:
 *         description: Clase actualizada con éxito.
 *       404:
 *         description: Clase no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
router.put('/:id', validarToken(), classController.actualizarClase);

/**
 * @swagger
 * /clases/{id}:
 *   delete:
 *     summary: Eliminar una clase por ID
 *     description: Permite eliminar una clase específica por su ID.
 *     tags: [Clases]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la clase a eliminar.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Clase eliminada con éxito.
 *       404:
 *         description: Clase no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete('/:id', validarToken(), classController.eliminarClase);

module.exports = router;
