const express = require('express');
const router = express.Router();
const clasesController = require('../controllers/clasesController');
const validarToken = require('../middlewares/validarToken');

/**
 * @swagger
 * tags:
 *   name: Clases
 *   description: Rutas relacionadas con la gestión de clases
 */

/**
 * @swagger
 * /clases:
 *   post:
 *     summary: Crear una nueva clase
 *     description: Crea una nueva clase para un docente.
 *     tags: [Clases]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - descripcion
 *               - nivel
 *               - materia
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre de la clase
 *               descripcion:
 *                 type: string
 *                 description: Descripción de la clase
 *               nivel:
 *                 type: string
 *                 description: Nivel educativo de la clase
 *               materia:
 *                 type: string
 *                 description: Materia de la clase
 *     responses:
 *       201:
 *         description: Clase creada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_clase:
 *                   type: integer
 *                   description: ID de la clase recién creada
 *       400:
 *         description: Parámetros de entrada inválidos
 *       401:
 *         description: Token de autenticación no válido o expirado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /clases/{codigo_clase}:
 *   get:
 *     summary: Obtener una clase por su código
 *     description: Recupera los detalles de una clase usando su código único.
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
 *         description: Clase encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                   description: Nombre de la clase
 *                 descripcion:
 *                   type: string
 *                   description: Descripción de la clase
 *                 nivel:
 *                   type: string
 *                   description: Nivel educativo de la clase
 *       404:
 *         description: Clase no encontrada
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /clases:
 *   get:
 *     summary: Obtener todas las clases de un docente
 *     description: Recupera todas las clases asociadas a un docente.
 *     tags: [Clases]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Clases encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_clase:
 *                     type: integer
 *                     description: ID de la clase
 *                   nombre:
 *                     type: string
 *                     description: Nombre de la clase
 *       401:
 *         description: Token de autenticación no válido o expirado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /clases/unirse:
 *   post:
 *     summary: Unirse a una clase con el código
 *     description: Permite a un estudiante unirse a una clase usando su código único.
 *     tags: [Clases]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - codigo_clase
 *             properties:
 *               codigo_clase:
 *                 type: string
 *                 description: Código de la clase a la que se desea unirse
 *     responses:
 *       200:
 *         description: El estudiante se unió a la clase con éxito
 *       400:
 *         description: Código de clase inválido o ya registrado en la clase
 *       404:
 *         description: Clase no encontrada
 *       401:
 *         description: Token de autenticación no válido o expirado
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
