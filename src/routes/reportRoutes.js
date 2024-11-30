const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

/**
 * @swagger
 * /reportes/clase/{id}:
 *   get:
 *     summary: Generar reporte PDF de una clase
 *     description: Genera un reporte detallado en formato PDF para una clase específica.
 *     tags: [Reportes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la clase para generar el reporte.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reporte generado con éxito.
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Clase no encontrada.
 *       500:
 *         description: Error al generar el reporte.
 */
router.get('/clase/:id', reportController.generarReporteClase);

module.exports = router;
