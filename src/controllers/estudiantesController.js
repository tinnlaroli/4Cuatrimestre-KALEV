// estudiantesController.js
const EstudianteModel = require('../models/estudianteModel');
const ClaseModel = require('../models/claseModel');
const JuegoModel = require('../models/juegoModel'); 

const estudiantesController = {
    // Unirse a una clase
    unirseAClase: async (req, res) => {
        const { codigo_clase } = req.body;
        const estudianteId = req.usuario.id_usuario; // Obtener el ID del estudiante desde el JWT

        // Validaciones
        if (!codigo_clase || typeof codigo_clase !== 'string' || codigo_clase.trim().length === 0) {
            return res.status(400).json({ error: 'El código de la clase es necesario y debe ser válido' });
        }

        try {
            const clase = await ClaseModel.obtenerClasePorCodigo(codigo_clase);
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

        // Validaciones
        if (!id_clase || isNaN(id_clase) || id_clase <= 0) {
            return res.status(400).json({ error: 'El ID de la clase es necesario y debe ser válido' });
        }

        try {
            const estudiantes = await EstudianteModel.obtenerEstudiantesPorClase(id_clase);
            res.status(200).json(estudiantes);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener los estudiantes' });
        }
    },

    // Obtener todas las clases de un estudiante
    obtenerClasesPorEstudiante: async (req, res) => {
        const { id_estudiante } = req.params;

        // Validaciones
        if (!id_estudiante || isNaN(id_estudiante) || id_estudiante <= 0) {
            return res.status(400).json({ error: 'El ID del estudiante es necesario y debe ser válido' });
        }

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

        // Validaciones
        if (!id_docente || isNaN(id_docente) || id_docente <= 0) {
            return res.status(400).json({ error: 'El ID del docente es necesario y debe ser válido' });
        }

        try {
            const clases = await ClaseModel.obtenerClasesPorDocente(id_docente);
            res.status(200).json(clases);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener las clases del docente' });
        }
    },

    // Asignar un juego a un estudiante
    asignarJuegoAEstudiante: async (req, res) => {
        const { id_juego } = req.body;
        const estudianteId = req.usuario.id_usuario; // Obtener el ID del estudiante desde el JWT

        // Validaciones
        if (!id_juego || isNaN(id_juego) || id_juego <= 0) {
            return res.status(400).json({ error: 'El ID del juego es necesario y debe ser válido' });
        }

        try {
            const juego = await JuegoModel.obtenerJuegoPorId(id_juego);
            if (!juego) {
                return res.status(404).json({ message: 'Juego no encontrado' });
            }

            // Asignar juego a estudiante
            await EstudianteModel.asignarJuegoAEstudiante(estudianteId, id_juego);
            res.status(200).json({ message: 'Juego asignado con éxito' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al asignar el juego' });
        }
    },

    // Obtener el progreso de un estudiante en un juego
    obtenerProgresoJuego: async (req, res) => {
        const { id_juego } = req.params;
        const estudianteId = req.usuario.id_usuario; // Obtener el ID del estudiante desde el JWT

        // Validaciones
        if (!id_juego || isNaN(id_juego) || id_juego <= 0) {
            return res.status(400).json({ error: 'El ID del juego es necesario y debe ser válido' });
        }

        try {
            const progreso = await EstudianteModel.obtenerProgresoJuego(estudianteId, id_juego);
            if (!progreso) {
                return res.status(404).json({ message: 'Progreso no encontrado' });
            }
            res.status(200).json(progreso);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener el progreso del juego' });
        }
    },

    // Marcar el juego como completado
    completarJuego: async (req, res) => {
        const { id_juego } = req.params;
        const estudianteId = req.usuario.id_usuario; // Obtener el ID del estudiante desde el JWT

        // Validaciones
        if (!id_juego || isNaN(id_juego) || id_juego <= 0) {
            return res.status(400).json({ error: 'El ID del juego es necesario y debe ser válido' });
        }

        try {
            const juegoCompletado = await EstudianteModel.marcarJuegoComoCompletado(estudianteId, id_juego);
            if (!juegoCompletado) {
                return res.status(404).json({ message: 'Juego no completado o no encontrado' });
            }

            res.status(200).json({ message: 'Juego completado con éxito' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al completar el juego' });
        }
    }
};

module.exports = estudiantesController;
