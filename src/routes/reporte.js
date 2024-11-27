const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporteController');
const validarToken = require('../middlewares/validarToken');

/**
 * @swagger
 * /clases/{id_clase}/reporte:
 *   get:
 *     summary: Generar un reporte PDF de la clase
 *     security:
 *       - BearerAuth: []
 *     tags: [Clases]
 *     parameters:
 *       - in: path
 *         name: id_clase
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la clase para generar el reporte
 *     responses:
 *       200:
 *         description: Reporte PDF generado exitosamente
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: No autorizado. Token inválido o no proporcionado
 *       404:
 *         description: Clase no encontrada
 *       500:
 *         description: Error interno del servidor
 */

// Ruta para generar el PDF del reporte
router.get('/clases/:id_clase/reporte', validarToken(), reporteController.generarReportePDF);

module.exports = router;
