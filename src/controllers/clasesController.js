    const ClaseModel = require("../models/claseModel"); // Importar el modelo de clases
    const EstudianteModel = require("../models/estudianteModel"); // Importar el modelo de estudiantes (para asignar estudiantes a clases)

    const clasesController = {
    // Crear una nueva clase
    crearClase: async (req, res) => {
        const { nombre_clase, codigo_clase } = req.body;
        const id_docente = req.usuario.id_usuario; // El id del docente debe ser tomado de req.usuario.id

        console.log("Datos recibidos para crear clase:", {
        nombre_clase,
        codigo_clase,
        id_docente,
        });

        if (!nombre_clase || !codigo_clase || !id_docente) {
        console.log("Faltan datos:", { nombre_clase, codigo_clase, id_docente });
        return res.status(400).json({ error: "Faltan datos necesarios" });
        }

        try {
        const clase = await ClaseModel.crearClase({
            nombre_clase,
            codigo_clase,
            id_docente,
        });
        res.status(201).json(clase);
        } catch (error) {
        console.error("Error al crear la clase:", error);
        res.status(500).json({ message: "Error al crear la clase" });
        }
    },

    // Obtener una clase por su código
    obtenerClasePorCodigo: async (req, res) => {
        const { codigo_clase } = req.params;

        console.log("Solicitando clase con código:", codigo_clase);

        try {
        const clase = await ClaseModel.obtenerClasePorCodigo(codigo_clase);
        if (!clase) {
            console.log("Clase no encontrada con código:", codigo_clase);
            return res.status(404).json({ message: "Clase no encontrada" });
        }
        console.log("Clase encontrada:", clase);
        res.status(200).json(clase);
        } catch (error) {
        console.error("Error al obtener la clase:", error);
        res.status(500).json({ message: "Error al obtener la clase" });
        }
    },

    // Obtener todas las clases de un docente
    obtenerClasesPorDocente: async (req, res) => {
        const id_docente = req.usuario.id;

        console.log("Solicitando clases para el docente con ID:", id_docente);

        try {
        const clases = await ClaseModel.obtenerClasesPorDocente(id_docente);
        console.log("Clases encontradas:", clases);
        res.status(200).json(clases);
        } catch (error) {
        console.error("Error al obtener las clases:", error);
        res.status(500).json({ message: "Error al obtener las clases" });
        }
    },

    // Unirse a una clase con un código
    unirseAClase: async (req, res) => {
        const { codigo_clase } = req.body;
        const estudianteId = req.usuario.id_usuario; // El estudiante que hace la petición

        console.log(
        "Estudiante con ID",
        estudianteId,
        "intentando unirse a la clase con código:",
        codigo_clase
        );

        try {
        const clase = await ClaseModel.obtenerClasePorCodigo(codigo_clase);
        if (!clase) {
            console.log("Clase no encontrada con código:", codigo_clase);
            return res.status(404).json({ message: "Clase no encontrada" });
        }

        // Añadir al estudiante a la clase
        console.log("Añadiendo estudiante a la clase...");
        await EstudianteModel.unirseAClase(estudianteId, clase.id_clase);
        console.log("Estudiante añadido con éxito a la clase");
        res.status(200).json({ message: "Te has unido a la clase con éxito" });
        } catch (error) {
        console.error("Error al unirse a la clase:", error);
        res.status(500).json({ message: "Error al unirse a la clase" });
        }
    },
    };

    module.exports = clasesController;
