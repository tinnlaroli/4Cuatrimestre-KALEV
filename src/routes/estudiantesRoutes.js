// clases.js
const express = require('express');
const router = express.Router();
const estudiantesController = require('../controllers/estudiantesController');

// Obtener todas las clases en las que un estudiante está inscrito
router.get('/:id_estudiante/clases', estudiantesController.obtenerClasesPorEstudiante);

// Obtener estudiantes de una clase
router.get('/:id_clase/estudiantes', estudiantesController.obtenerEstudiantesPorClase);

// Obtener todas las clases de un docente
router.get('/:id_docente/clases', estudiantesController.obtenerClasesPorDocente);

module.exports = router;
