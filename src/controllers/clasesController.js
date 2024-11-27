// clasesController.js
const ClaseModel = require('../models/claseModel');
const EstudianteModel = require('../models/estudianteModel');
const JuegoModel = require('../models/juegoModel');

const clasesController = {
    // Crear una nueva clase
    crearClase: async (req, res) => {
        const { nombre_clase, codigo_clase } = req.body;
        const id_docente = req.usuario.id_usuario; // El id del docente debe ser tomado de req.usuario.id

        if (!nombre_clase || !codigo_clase || !id_docente) {
            return res.status(400).json({ error: 'Faltan datos necesarios' });
        }

        try {
            const clase = await ClaseModel.crearClase({
                nombre_clase,
                codigo_clase,
                id_docente,
            });
            res.status(201).json(clase);
        } catch (error) {
            console.error('Error al crear la clase:', error);
            res.status(500).json({ message: 'Error al crear la clase' });
        }
    },

    // Obtener una clase por su código
    obtenerClasePorCodigo: async (req, res) => {
        const { codigo_clase } = req.params;

        try {
            const clase = await ClaseModel.obtenerClasePorCodigo(codigo_clase);
            if (!clase) {
                return res.status(404).json({ message: 'Clase no encontrada' });
            }
            res.status(200).json(clase);
        } catch (error) {
            console.error('Error al obtener la clase:', error);
            res.status(500).json({ message: 'Error al obtener la clase' });
        }
    },

    // Obtener todas las clases de un docente
    obtenerClasesPorDocente: async (req, res) => {
        const id_docente = req.usuario.id_usuario;

        try {
            const clases = await ClaseModel.obtenerClasesPorDocente(id_docente);
            res.status(200).json(clases);
        } catch (error) {
            console.error('Error al obtener las clases:', error);
            res.status(500).json({ message: 'Error al obtener las clases' });
        }
    },

    // Asignar un juego a una clase
    asignarJuegoAClase: async (req, res) => {
        const { id_clase, id_juego } = req.body;

        try {
            const juego = await JuegoModel.obtenerJuegoPorId(id_juego);
            if (!juego) {
                return res.status(404).json({ message: 'Juego no encontrado' });
            }

            const clase = await ClaseModel.obtenerClasePorId(id_clase);
            if (!clase) {
                return res.status(404).json({ message: 'Clase no encontrada' });
            }

            await ClaseModel.asignarJuegoAClase(id_clase, id_juego);
            res.status(200).json({ message: 'Juego asignado a la clase con éxito' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al asignar el juego a la clase' });
        }
    },

    // Obtener los juegos asignados a una clase
    obtenerJuegosPorClase: async (req, res) => {
        const { id_clase } = req.params;

        try {
            const juegos = await ClaseModel.obtenerJuegosPorClase(id_clase);
            res.status(200).json(juegos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener los juegos de la clase' });
        }
    },
    // Unirse a una clase con el código
unirseAClase: async (req, res) => {
    const { codigo_clase } = req.body;
    const id_estudiante = req.usuario.id_usuario; // Tomar el id del estudiante desde el token

    if (!codigo_clase) {
        return res.status(400).json({ error: 'Falta el código de la clase' });
    }

    try {
        // Buscar la clase por su código
        const clase = await ClaseModel.obtenerClasePorCodigo(codigo_clase);
        if (!clase) {
            return res.status(404).json({ message: 'Clase no encontrada' });
        }

        // Verificar si el estudiante ya está registrado en la clase
        const estudianteEnClase = await EstudianteModel.obtenerEstudianteEnClase(id_estudiante, clase.id_clase);
        if (estudianteEnClase) {
            return res.status(400).json({ message: 'El estudiante ya está en esta clase' });
        }

        // Agregar al estudiante a la clase
        await EstudianteModel.unirseAClase(id_estudiante, clase.id_clase);
        res.status(200).json({ message: 'Estudiante se unió a la clase con éxito' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al unirse a la clase' });
    }
}

};

module.exports = clasesController;
