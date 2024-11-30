const PDFDocument = require('pdfkit');

/**
 * Genera un PDF con los datos proporcionados.
 * @param {Object} contenido - Contenido del PDF.
 * @returns {Promise<Buffer>} - Buffer con el contenido del PDF.
 */
const generarPDF = (contenido) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const buffers = [];

        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => resolve(Buffer.concat(buffers)));
        doc.on('error', reject);

        // Título del reporte
        doc.fontSize(18).text(contenido.titulo, { align: 'center' }).moveDown();

        // Datos del docente
        doc.fontSize(12).text(`Docente: ${contenido.docente}`).moveDown();

        // Tabla de estudiantes
        doc.fontSize(14).text('Estudiantes:', { underline: true }).moveDown(0.5);
        contenido.estudiantes.forEach((estudiante, index) => {
            doc
                .fontSize(12)
                .text(`${index + 1}. ${estudiante.nombre_estudiante} - ${estudiante.correo} - Progreso: ${estudiante.progreso}%`);
        });

        doc.end();
    });
};

module.exports = { generarPDF };
