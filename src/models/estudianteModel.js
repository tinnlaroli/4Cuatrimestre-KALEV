    const { pool } = require("../utils/db");

    const EstudianteModel = {
    // Unirse a una clase
    unirseAClase: async (id_estudiante, id_clase) => {
        const query = `
                INSERT INTO EstudiantesPorClase (id_estudiante, id_clase)
                VALUES ($1, $2)
                RETURNING *;
            `;
        const values = [id_estudiante, id_clase];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    // Obtener todos los estudiantes de una clase
    obtenerEstudiantesPorClase: async (id_clase) => {
        const query = `
                SELECT u.id_usuario, u.nombre, u.correo
                FROM EstudiantesPorClase epc
                JOIN Usuarios u ON epc.id_estudiante = u.id_usuario
                WHERE epc.id_clase = $1;
            `;
        const result = await pool.query(query, [id_clase]);
        return result.rows;
    },

    // Obtener todas las clases en las que un estudiante está inscrito
    obtenerClasesPorEstudiante: async (id_estudiante) => {
        const query = `
                SELECT c.id_clase, c.nombre_clase, c.codigo_clase
                FROM EstudiantesPorClase epc
                JOIN Clases c ON epc.id_clase = c.id_clase
                WHERE epc.id_estudiante = $1;
            `;
        const result = await pool.query(query, [id_estudiante]);
        return result.rows;
    },
    // Verificar si el estudiante está en una clase específica
    obtenerEstudianteEnClase: async (id_estudiante, id_clase) => {
        try {
        const result = await pool.query(
            "SELECT * FROM EstudiantesPorClase WHERE id_estudiante = $1 AND id_clase = $2",
            [id_estudiante, id_clase]
        );
        // Si el estudiante ya está en la clase, la consulta devolverá algún resultado
        return result.rows[0] || null;
        } catch (error) {
        console.error("Error al obtener estudiante en clase:", error);
        throw error;
        }
    },

    // Otro método como unirse a la clase
    unirseAClase: async (id_estudiante, id_clase) => {
        try {
        await pool.query(
            "INSERT INTO EstudiantesPorClase (id_estudiante, id_clase) VALUES ($1, $2)",
            [id_estudiante, id_clase]
        );
        } catch (error) {
        console.error("Error al unirse a la clase:", error);
        throw error;
        }
    },
    };

    module.exports = EstudianteModel;
