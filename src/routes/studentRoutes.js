const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

/**
 * @swagger
 * /students:
 *   get:
 *     summary: "Obtener todos los estudiantes"
 *     description: "Devuelve una lista de todos los estudiantes registrados."
 *     responses:
 *       200:
 *         description: "Lista de estudiantes obtenida exitosamente."
 *       500:
 *         description: "Error al obtener los estudiantes."
 */
router.get('/', studentController.getAllStudents);

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: "Obtener un estudiante por ID"
 *     description: "Devuelve los datos de un estudiante específico."
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         required: true
 *         description: "ID del estudiante"
 *         schema:
 *           type: "integer"
 *     responses:
 *       200:
 *         description: "Estudiante obtenido exitosamente."
 *       404:
 *         description: "Estudiante no encontrado."
 *       500:
 *         description: "Error al obtener el estudiante."
 */
router.get('/:id', studentController.getStudentById);

/**
 * @swagger
 * /students:
 *   post:
 *     summary: "Registrar un nuevo estudiante"
 *     description: "Permite registrar un nuevo estudiante en una clase."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               correo:
 *                 type: string
 *               id_clase:
 *                 type: integer
 *     responses:
 *       201:
 *         description: "Estudiante registrado exitosamente."
 *       500:
 *         description: "Error al registrar el estudiante."
 */
router.post('/', studentController.createStudent);

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: "Actualizar un estudiante"
 *     description: "Permite actualizar los datos de un estudiante específico."
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         required: true
 *         description: "ID del estudiante"
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
 *               correo:
 *                 type: string
 *               id_clase:
 *                 type: integer
 *     responses:
 *       200:
 *         description: "Estudiante actualizado exitosamente."
 *       404:
 *         description: "Estudiante no encontrado."
 *       500:
 *         description: "Error al actualizar el estudiante."
 */
router.put('/:id', studentController.updateStudent);

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: "Eliminar un estudiante"
 *     description: "Permite eliminar un estudiante específico."
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         required: true
 *         description: "ID del estudiante"
 *         schema:
 *           type: "integer"
 *     responses:
 *       200:
 *         description: "Estudiante eliminado exitosamente."
 *       404:
 *         description: "Estudiante no encontrado."
 *       500:
 *         description: "Error al eliminar el estudiante."
 */
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
