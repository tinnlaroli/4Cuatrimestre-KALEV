const studentModel = require('../models/studentModel');

const getAllStudents = async (req, res) => {
    try {
        const students = await studentModel.obtenerAlumnos();  // Cambié 'obtenerEstudiantes' por 'obtenerAlumnos'
        res.status(200).json(students);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los alumnos', error: error.message });  // Cambié 'estudiantes' por 'alumnos'
    }
};

const getStudentById = async (req, res) => {
    const { id } = req.params;
    try {
        const student = await studentModel.obtenerAlumnoPorId(id);  // Cambié 'obtenerEstudiantePorId' por 'obtenerAlumnoPorId'
        if (!student) {
            return res.status(404).json({ message: 'Alumno no encontrado' });  // Cambié 'Estudiante' por 'Alumno'
        }
        res.status(200).json(student);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el alumno', error: error.message });  // Cambié 'estudiante' por 'alumno'
    }
};

const createStudent = async (req, res) => {
    const { nombre, apellido, correo, fecha_nacimiento, id_grupo } = req.body;
    
    // Verificar que todos los campos necesarios estén presentes
    if (!nombre || !apellido || !correo || !fecha_nacimiento || !id_grupo) {
        return res.status(400).json({ message: 'Faltan campos obligatorios: nombre, apellido, correo, fecha_nacimiento, o id_grupo.' });
    }

    try {
        const newStudent = await studentModel.registrarAlumno(nombre, apellido, correo, fecha_nacimiento, id_grupo);
        res.status(201).json(newStudent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar el alumno', error: error.message });
    }
};



const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { nombre, correo, telefono, id_grupo } = req.body;  // Cambié 'id_clase' por 'id_grupo'
    try {
        const updatedStudent = await studentModel.actualizarAlumno(id, nombre, correo, telefono, id_grupo);  // Cambié 'actualizarEstudiante' por 'actualizarAlumno'
        if (!updatedStudent) {
            return res.status(404).json({ message: 'Alumno no encontrado' });  // Cambié 'Estudiante' por 'Alumno'
        }
        res.status(200).json(updatedStudent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el alumno', error: error.message });  // Cambié 'estudiante' por 'alumno'
    }
};

const deleteStudent = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedStudent = await studentModel.eliminarAlumno(id);  // Cambié 'eliminarEstudiante' por 'eliminarAlumno'
        if (!deletedStudent) {
            return res.status(404).json({ message: 'Alumno no encontrado' });  // Cambié 'Estudiante' por 'Alumno'
        }
        res.status(200).json({ message: 'Alumno eliminado correctamente', id: deletedStudent.id_alumno });  // Cambié 'estudiante' por 'alumno'
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el alumno', error: error.message });  // Cambié 'estudiante' por 'alumno'
    }
};

module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
};
