const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporteController');
const validarToken = require('../middlewares/validarToken');

/**
 * @swagger
 * tags:
 *   name: Clases Reporte
 *   description: Reporte PDF
 */

// Ruta para generar el PDF del reporte
router.get('/clases/:id_clase/reporte', validarToken(), reporteController.generarReportePDF);

module.exports = router;
