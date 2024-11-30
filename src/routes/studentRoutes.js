const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

/**
 * @swagger
 * tags:
 *   name: Estudiantes
 *   description: Gestión de estudiantes registrados en las clases.
 */

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Obtener todos los estudiantes
 *     description: Devuelve una lista de todos los estudiantes registrados.
 *     tags: [Estudiantes]
 *     responses:
 *       200:
 *         description: Lista de estudiantes obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_estudiante:
 *                     type: integer
 *                     example: 1
 *                   nombre:
 *                     type: string
 *                     example: Juan Pérez
 *                   correo:
 *                     type: string
 *                     example: juan.perez@example.com
 *                   id_clase:
 *                     type: integer
 *                     example: 101
 *       500:
 *         description: Error al obtener los estudiantes.
 */
router.get('/', studentController.getAllStudents);

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Obtener un estudiante por ID
 *     description: Devuelve los datos de un estudiante específico.
 *     tags: [Estudiantes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del estudiante.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estudiante obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_estudiante:
 *                   type: integer
 *                   example: 1
 *                 nombre:
 *                   type: string
 *                   example: Juan Pérez
 *                 correo:
 *                   type: string
 *                   example: juan.perez@example.com
 *                 id_clase:
 *                   type: integer
 *                   example: 101
 *       404:
 *         description: Estudiante no encontrado.
 *       500:
 *         description: Error al obtener el estudiante.
 */
router.get('/:id', studentController.getStudentById);

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Registrar un nuevo estudiante
 *     description: Permite registrar un nuevo estudiante en una clase.
 *     tags: [Estudiantes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - correo
 *               - id_clase
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del estudiante.
 *                 example: María López
 *               correo:
 *                 type: string
 *                 description: Correo electrónico del estudiante.
 *                 example: maria.lopez@example.com
 *               id_clase:
 *                 type: integer
 *                 description: ID de la clase a la que pertenece el estudiante.
 *                 example: 101
 *     responses:
 *       201:
 *         description: Estudiante registrado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_estudiante:
 *                   type: integer
 *                   example: 2
 *                 nombre:
 *                   type: string
 *                   example: María López
 *                 correo:
 *                   type: string
 *                   example: maria.lopez@example.com
 *                 id_clase:
 *                   type: integer
 *                   example: 101
 *       500:
 *         description: Error al registrar el estudiante.
 */
router.post('/', studentController.createStudent);

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Actualizar un estudiante
 *     description: Permite actualizar los datos de un estudiante específico.
 *     tags: [Estudiantes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del estudiante.
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
 *               - correo
 *               - id_clase
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre actualizado del estudiante.
 *               correo:
 *                 type: string
 *                 description: Correo electrónico actualizado del estudiante.
 *               id_clase:
 *                 type: integer
 *                 description: ID de la clase actualizada del estudiante.
 *     responses:
 *       200:
 *         description: Estudiante actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_estudiante:
 *                   type: integer
 *                   example: 1
 *                 nombre:
 *                   type: string
 *                   example: Juan Pérez Actualizado
 *                 correo:
 *                   type: string
 *                   example: juan.perez.actualizado@example.com
 *                 id_clase:
 *                   type: integer
 *                   example: 102
 *       404:
 *         description: Estudiante no encontrado.
 *       500:
 *         description: Error al actualizar el estudiante.
 */
router.put('/:id', studentController.updateStudent);

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Eliminar un estudiante
 *     description: Permite eliminar un estudiante específico.
 *     tags: [Estudiantes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del estudiante.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estudiante eliminado exitosamente.
 *       404:
 *         description: Estudiante no encontrado.
 *       500:
 *         description: Error al eliminar el estudiante.
 */
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
