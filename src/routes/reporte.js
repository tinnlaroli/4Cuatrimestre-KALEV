const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporteController');
const validarToken = require('../middlewares/validarToken');

/**
 * @swagger
 * /clases/{id_clase}/reporte:
 *   get:
 *     summary: Generar el reporte en PDF de una clase
 *     description: Permite al docente generar un reporte en PDF que incluye el progreso de los estudiantes en una clase.
 *     tags: [Reportes]
 *     parameters:
 *       - in: path
 *         name: id_clase
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la clase para la cual se generará el reporte
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Reporte generado con éxito
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *             description: El reporte en PDF de la clase
 *       400:
 *         description: Parámetro de ID de clase inválido o faltante
 *       401:
 *         description: Token de autenticación no válido o expirado
 *       404:
 *         description: Clase no encontrada
 *       500:
 *         description: Error interno del servidor
 */

// Ruta para generar el PDF del reporte
router.get('/clases/:id_clase/reporte', validarToken(), reporteController.generarReportePDF);

module.exports = router;
