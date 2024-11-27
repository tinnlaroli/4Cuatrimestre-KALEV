const reporteService = require('../models/reporteModel');
const PDFDocument = require('pdfkit');

const generarReportePDF = async (req, res) => {
    const { id_clase } = req.params;
    if (!id_clase) {
        return res.status(400).json({ message: 'El id_clase es obligatorio.' });
    }

    
    try {
        // Obtener los datos necesarios
        const datosClase = await reporteService.obtenerDatosClase(id_clase);
        if (!datosClase) {
            return res.status(404).json({ message: 'La clase no existe o no se encontró.' });
        }
        const estudiantes = await reporteService.obtenerListaEstudiantes(id_clase);
        const progreso = await reporteService.obtenerProgresoIndividual(id_clase);

        // Crear el PDF
        const pdfDoc = new PDFDocument();
        const chunks = [];
        pdfDoc.on('data', (chunk) => chunks.push(chunk));
        pdfDoc.on('end', () => {
            const pdfBuffer = Buffer.concat(chunks);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=reporte_clase_${id_clase}.pdf`);
            res.send(pdfBuffer);
        });

        // Agregar contenido al PDF
        pdfDoc.fontSize(18).text(`Reporte de Progreso - Clase: ${datosClase.nombre_clase}`, { align: 'center' });
        pdfDoc.moveDown();
        pdfDoc.text(`Docente: ${datosClase.nombre_docente}`, { align: 'left' });
        pdfDoc.text(`Fecha: ${new Date().toLocaleDateString()}`, { align: 'left' });
        pdfDoc.moveDown();

        pdfDoc.fontSize(14).text('Lista de Estudiantes:', { underline: true });
        estudiantes.forEach((est, index) => {
            pdfDoc.text(`${index + 1}. ${est.nombre} - ${est.correo} - Estilo dominante: ${est.estilo_dominante}`);
        });

        pdfDoc.addPage();
        pdfDoc.fontSize(14).text('Progreso Individual:', { underline: true });
        progreso.forEach((prog) => {
            pdfDoc.text(`${prog.nombre_estudiante}: Puertas desbloqueadas - ${prog.puertas_desbloqueadas}, Medallas ganadas - ${prog.medallas_ganadas}`);
        });

        pdfDoc.end(); // Finalizar el documento
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al generar el reporte' });
    }
};

module.exports = {
    generarReportePDF,
};