// estudiantesController.js
const EstudianteModel = require('../models/estudianteModel');
const ClaseModel = require('../models/claseModel'); // Asegúrate de tener este modelo

const estudiantesController = {
    // Unirse a una clase
    unirseAClase: async (req, res) => {
        const { codigo_clase } = req.body;
        const estudianteId = req.usuario.id_usuario; // Obtener el ID del estudiante desde el JWT

        try {
            const clase = await ClaseModel.obtenerClasePorCodigo(codigo_clase); // Asegúrate de tener esta función en tu modelo de clase
            if (!clase) {
                return res.status(404).json({ message: 'Clase no encontrada' });
            }

            const estudiante = await EstudianteModel.unirseAClase(estudianteId, clase.id_clase);
            res.status(200).json({ message: 'Te has unido a la clase con éxito', estudiante });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al unirse a la clase' });
        }
    },

    // Obtener todos los estudiantes de una clase
    obtenerEstudiantesPorClase: async (req, res) => {
        const { id_clase } = req.params;

        try {
            const estudiantes = await EstudianteModel.obtenerEstudiantesPorClase(id_clase);
            res.status(200).json(estudiantes);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener los estudiantes' });
        }
    },

    // Obtener todas las clases en las que un estudiante está inscrito
    obtenerClasesPorEstudiante: async (req, res) => {
        const { id_estudiante } = req.params;

        try {
            const clases = await EstudianteModel.obtenerClasesPorEstudiante(id_estudiante);
            res.status(200).json(clases);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener las clases del estudiante' });
        }
    },

    // Obtener todas las clases de un docente
    obtenerClasesPorDocente: async (req, res) => {
        const { id_docente } = req.params;

        try {
            const clases = await ClaseModel.obtenerClasesPorDocente(id_docente);
            res.status(200).json(clases);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener las clases del docente' });
        }
    }
};

module.exports = estudiantesController;
