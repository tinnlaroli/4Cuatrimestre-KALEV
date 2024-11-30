// **Controlador (studentController.js)**
const studentModel = require('../models/studentModel');

// Controlador para obtener todos los estudiantes
const getAllStudents = async (req, res) => {
    try {
        const students = await studentModel.obtenerEstudiantes();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los estudiantes' });
    }
};

// Controlador para obtener un estudiante por ID
const getStudentById = async (req, res) => {
    const { id } = req.params;
    try {
        const student = await studentModel.obtenerEstudiantePorId(id);
        if (!student) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el estudiante' });
    }
};

// Controlador para registrar un estudiante
const createStudent = async (req, res) => {
    const { nombre, correo, id_clase } = req.body;
    try {
        const newStudent = await studentModel.registrarEstudiante(nombre, correo, id_clase);
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar el estudiante' });
    }
};

// Controlador para actualizar un estudiante
const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { nombre, correo, id_clase } = req.body;
    try {
        const updatedStudent = await studentModel.actualizarEstudiante(id, nombre, correo, id_clase);
        if (!updatedStudent) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }
        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el estudiante' });
    }
};

// Controlador para eliminar un estudiante
const deleteStudent = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedStudent = await studentModel.eliminarEstudiante(id);
        if (!deletedStudent) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }
        res.status(200).json({ message: 'Estudiante eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el estudiante' });
    }
};

module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
};