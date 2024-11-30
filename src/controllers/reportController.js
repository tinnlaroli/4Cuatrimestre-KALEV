const reportModel = require('../models/reportModel');
const { generarPDF } = require('../utils/pdfGenerator');

const generarReporteClase = async (req, res) => {
    const { id } = req.params;

    try {
        const datosClase = await reportModel.obtenerDatosClase(id);
        if (!datosClase) {
            return res.status(404).json({ message: 'Clase no encontrada.' });
        }

        const estudiantes = await reportModel.obtenerEstudiantesClase(id);

        // Generar contenido del reporte
        const contenidoPDF = {
            titulo: `Reporte de la clase: ${datosClase.nombre_clase}`,
            docente: datosClase.nombre_docente,
            estudiantes,
        };

        const pdfBuffer = await generarPDF(contenidoPDF);

        // Configurar la respuesta para enviar el archivo PDF
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=reporte_clase.pdf');
        res.send(pdfBuffer);
    } catch (error) {
        console.error('Error al generar el reporte:', error);
        res.status(500).json({ message: 'Error al generar el reporte.' });
    }
};

module.exports = {
    generarReporteClase,
};
