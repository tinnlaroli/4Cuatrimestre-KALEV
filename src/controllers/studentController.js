const studentModel = require('../models/studentModel');

const getAllStudents = async (req, res) => {
    try {
        const students = await studentModel.obtenerEstudiantes();
        res.status(200).json(students);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los estudiantes', error: error.message });
    }
};

const getStudentById = async (req, res) => {
    const { id } = req.params;
    try {
        const student = await studentModel.obtenerEstudiantePorId(id);
        if (!student) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        res.status(200).json(student);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el estudiante', error: error.message });
    }
};

const createStudent = async (req, res) => {
    const { nombre, correo, id_clase } = req.body;
    try {
        const newStudent = await studentModel.registrarEstudiante(nombre, correo, id_clase);
        res.status(201).json(newStudent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar el estudiante', error: error.message });
    }
};

const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { nombre, correo, id_clase } = req.body;
    try {
        const updatedStudent = await studentModel.actualizarEstudiante(id, nombre, correo, id_clase);
        if (!updatedStudent) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        res.status(200).json(updatedStudent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el estudiante', error: error.message });
    }
};

const deleteStudent = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedStudent = await studentModel.eliminarEstudiante(id);
        if (!deletedStudent) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        res.status(200).json({ message: 'Estudiante eliminado correctamente', id: deletedStudent.id_estudiante });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el estudiante', error: error.message });
    }
};

module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
};
