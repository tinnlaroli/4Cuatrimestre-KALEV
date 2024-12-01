const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const validarToken = require('../middlewares/validarToken');

/**
 * @swagger
 * tags:
 *   name: Grupos
 *   description: Gestión de grupos asignados a los directores.
 */

/**
 * @swagger
 * /grupos:
 *   post:
 *     summary: Crear un nuevo grupo
 *     description: Permite a un director crear un nuevo grupo con un nombre, grado y código único.
 *     tags: [Grupos]
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
 *               - codigo_unico
 *               - grado
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del grupo.
 *                 example: Grupo 1
 *               codigo_unico:
 *                 type: string
 *                 description: Código único para identificar el grupo.
 *                 example: GRP001
 *               grado:
 *                 type: string
 *                 description: Grado al que pertenece el grupo.
 *                 example: Primero
 *     responses:
 *       201:
 *         description: Grupo creado con éxito.
 *       400:
 *         description: Campos obligatorios faltantes.
 *       403:
 *         description: Solo los directores pueden crear grupos.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/', validarToken(), groupController.crearGrupo);

/**
 * @swagger
 * /grupos:
 *   get:
 *     summary: Obtener todos los grupos del docente autenticado
 *     description: Devuelve una lista de grupos asociados al docente autenticado.
 *     tags: [Grupos]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de grupos obtenida con éxito.
 *       404:
 *         description: No se encontraron grupos para este docente.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/', validarToken(), groupController.obtenerGrupos);

/**
 * @swagger
 * /grupos/{id}:
 *   get:
 *     summary: Obtener detalles de un grupo por ID
 *     description: Devuelve los detalles de un grupo específico según su ID.
 *     tags: [Grupos]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del grupo a consultar.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalles del grupo obtenidos con éxito.
 *       404:
 *         description: Grupo no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/:id', validarToken(), groupController.obtenerGrupoPorId);

/**
 * @swagger
 * /grupos/{id}:
 *   put:
 *     summary: Actualizar un grupo por ID
 *     description: Permite actualizar el nombre, grado o código único de un grupo específico.
 *     tags: [Grupos]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del grupo a actualizar.
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
 *               - codigo_unico
 *               - grado
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre actualizado del grupo.
 *                 example: Grupo Actualizado
 *               codigo_unico:
 *                 type: string
 *                 description: Código único actualizado del grupo.
 *                 example: GRP002
 *               grado:
 *                 type: string
 *                 description: Grado actualizado del grupo.
 *                 example: Segundo
 *     responses:
 *       200:
 *         description: Grupo actualizado con éxito.
 *       404:
 *         description: Grupo no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.put('/:id', validarToken(), groupController.actualizarGrupo);

/**
 * @swagger
 * /grupos/{id}:
 *   delete:
 *     summary: Eliminar un grupo por ID
 *     description: Permite eliminar un grupo específico por su ID.
 *     tags: [Grupos]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del grupo a eliminar.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Grupo eliminado con éxito.
 *       404:
 *         description: Grupo no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete('/:id', validarToken(), groupController.eliminarGrupo);

module.exports = router;
