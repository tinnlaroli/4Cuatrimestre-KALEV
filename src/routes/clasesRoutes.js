const express = require('express');
const router = express.Router();
const clasesController = require('../controllers/clasesController');
const validarToken = require('../middlewares/validarToken');

/**
 * @swagger
 * tags:
 *   name: Clases
 *   description: Endpoints relacionados con la gestión de clases
 */

/**
 * @swagger
 * /:
 *   post:
 *     summary: Crear una nueva clase
 *     security:
 *       - BearerAuth: []
 *     tags: [Clases]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_clase:
 *                 type: string
 *                 description: Nombre de la clase
 *               descripcion:
 *                 type: string
 *                 description: Descripción opcional de la clase
 *     responses:
 *       201:
 *         description: Clase creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_clase:
 *                   type: string
 *                   description: ID único de la clase
 *                 codigo_clase:
 *                   type: string
 *                   description: Código único de la clase
 *       400:
 *         description: Datos inválidos en la solicitud
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /{codigo_clase}:
 *   get:
 *     summary: Obtener una clase por su código
 *     tags: [Clases]
 *     parameters:
 *       - in: path
 *         name: codigo_clase
 *         required: true
 *         schema:
 *           type: string
 *         description: Código único de la clase
 *     responses:
 *       200:
 *         description: Información de la clase encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_clase:
 *                   type: string
 *                   description: ID de la clase
 *                 nombre_clase:
 *                   type: string
 *                   description: Nombre de la clase
 *                 descripcion:
 *                   type: string
 *                   description: Descripción de la clase
 *                 codigo_clase:
 *                   type: string
 *                   description: Código de la clase
 *       404:
 *         description: Clase no encontrada
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Obtener todas las clases de un docente
 *     security:
 *       - BearerAuth: []
 *     tags: [Clases]
 *     responses:
 *       200:
 *         description: Lista de clases del docente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_clase:
 *                     type: string
 *                     description: ID de la clase
 *                   nombre_clase:
 *                     type: string
 *                     description: Nombre de la clase
 *                   descripcion:
 *                     type: string
 *                     description: Descripción de la clase
 *                   codigo_clase:
 *                     type: string
 *                     description: Código único de la clase
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /unirse:
 *   post:
 *     summary: Unirse a una clase con el código
 *     security:
 *       - BearerAuth: []
 *     tags: [Clases]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigo_clase:
 *                 type: string
 *                 description: Código único de la clase
 *     responses:
 *       200:
 *         description: Estudiante unido exitosamente a la clase
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   description: Confirmación de la acción
 *       404:
 *         description: Clase no encontrada o código incorrecto
 *       500:
 *         description: Error interno del servidor
 */

// Crear una nueva clase (solo docente)
router.post('/', validarToken(), clasesController.crearClase);

// Obtener una clase por su código
router.get('/:codigo_clase', clasesController.obtenerClasePorCodigo);

// Obtener todas las clases de un docente
router.get('/', validarToken(), clasesController.obtenerClasesPorDocente);

// Unirse a una clase con el código
router.post('/unirse', validarToken(), clasesController.unirseAClase);

module.exports = router;
