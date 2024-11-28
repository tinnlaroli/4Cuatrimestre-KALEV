const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporteController');
const validarToken = require('../middlewares/validarToken');

/**
 * @swagger
 * reporte/clases/reporte/{id_clase}:
 *   get:
 *     summary: Generar reporte en PDF de una clase
 *     description: Permite al docente generar un reporte en formato PDF de los estudiantes y sus progresos en una clase específica. Requiere token de autenticación.
 *     tags: [Clases]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id_clase
 *         in: path
 *         required: true
 *         description: ID de la clase para la que se genera el reporte.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reporte PDF generado con éxito.
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: Token de autenticación no válido o no proporcionado.
 *       404:
 *         description: Clase no encontrada o no tiene estudiantes asignados.
 *       500:
 *         description: Error interno del servidor.
 */

// Ruta para generar el PDF del reporte
router.get('/clases/reporte/:id_clase', validarToken(), reporteController.generarReportePDF);

module.exports = router;
