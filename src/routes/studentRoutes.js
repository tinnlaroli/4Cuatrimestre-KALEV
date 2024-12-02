const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

/**
 * @swagger
 * tags:
 *   name: Alumnos
 *   description: Gestión de alumnos registrados en los grupos.
 */

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Obtener todos los alumnos
 *     description: Devuelve una lista de todos los alumnos registrados.
 *     tags: [Alumnos]
 *     responses:
 *       200:
 *         description: Lista de alumnos obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_alumno:
 *                     type: integer
 *                     example: 1
 *                   nombre:
 *                     type: string
 *                     example: Juan Pérez
 *                   correo:
 *                     type: string
 *                     example: juan.perez@example.com
 *                   id_grupo:
 *                     type: integer
 *                     example: 101
 *       500:
 *         description: Error al obtener los alumnos.
 */
router.get('/', studentController.getAllStudents);

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Obtener un alumno por ID
 *     description: Devuelve los datos de un alumno específico.
 *     tags: [Alumnos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del alumno.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Alumno obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_alumno:
 *                   type: integer
 *                   example: 1
 *                 nombre:
 *                   type: string
 *                   example: Juan Pérez
 *                 correo:
 *                   type: string
 *                   example: juan.perez@example.com
 *                 id_grupo:
 *                   type: integer
 *                   example: 101
 *       404:
 *         description: Alumno no encontrado.
 *       500:
 *         description: Error al obtener el alumno.
 */
router.get('/:id', studentController.getStudentById);

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Registrar un nuevo alumno
 *     description: Permite registrar un nuevo alumno en un grupo.
 *     tags: [Alumnos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - correo
 *               - id_grupo
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del alumno.
 *                 example: María López
 *               correo:
 *                 type: string
 *                 description: Correo electrónico del alumno.
 *                 example: maria.lopez@example.com
 *               id_grupo:
 *                 type: integer
 *                 description: ID del grupo al que pertenece el alumno.
 *                 example: 101
 *     responses:
 *       201:
 *         description: Alumno registrado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_alumno:
 *                   type: integer
 *                   example: 2
 *                 nombre:
 *                   type: string
 *                   example: María López
 *                 correo:
 *                   type: string
 *                   example: maria.lopez@example.com
 *                 id_grupo:
 *                   type: integer
 *                   example: 101
 *       500:
 *         description: Error al registrar el alumno.
 */
router.post('/', studentController.createStudent);

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Actualizar un alumno
 *     description: Permite actualizar los datos de un alumno específico.
 *     tags: [Alumnos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del alumno.
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
 *               - id_grupo
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre actualizado del alumno.
 *               correo:
 *                 type: string
 *                 description: Correo electrónico actualizado del alumno.
 *               id_grupo:
 *                 type: integer
 *                 description: ID del grupo actualizado del alumno.
 *     responses:
 *       200:
 *         description: Alumno actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_alumno:
 *                   type: integer
 *                   example: 1
 *                 nombre:
 *                   type: string
 *                   example: Juan Pérez Actualizado
 *                 correo:
 *                   type: string
 *                   example: juan.perez.actualizado@example.com
 *                 id_grupo:
 *                   type: integer
 *                   example: 102
 *       404:
 *         description: Alumno no encontrado.
 *       500:
 *         description: Error al actualizar el alumno.
 */
router.put('/:id', studentController.updateStudent);

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Eliminar un alumno
 *     description: Permite eliminar un alumno específico.
 *     tags: [Alumnos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del alumno.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Alumno eliminado exitosamente.
 *       404:
 *         description: Alumno no encontrado.
 *       500:
 *         description: Error al eliminar el alumno.
 */
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
