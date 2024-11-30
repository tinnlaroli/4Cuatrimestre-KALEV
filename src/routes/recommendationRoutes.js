const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');

// Ruta para obtener todas las recomendaciones
router.get('/', recommendationController.obtenerTodasLasRecomendaciones);

// Ruta para obtener una recomendación por ID
router.get('/:id', recommendationController.obtenerRecomendacionPorId);

// Ruta para crear una nueva recomendación
router.post('/', recommendationController.crearRecomendacion);

// Ruta para actualizar una recomendación existente por ID
router.put('/:id', recommendationController.actualizarRecomendacion);

// Ruta para eliminar una recomendación por ID
router.delete('/:id', recommendationController.eliminarRecomendacion);

module.exports = router;
