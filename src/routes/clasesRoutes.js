const express = require('express');
const router = express.Router();
const clasesController = require('../controllers/clasesController');
const validarToken = require('../middlewares/validarToken');

// Crear una nueva clase (solo docente)
router.post('/', validarToken(), clasesController.crearClase);

// Obtener una clase por su código
router.get('/:codigo_clase', clasesController.obtenerClasePorCodigo);

// Obtener todas las clases de un docente
router.get('/', validarToken(), clasesController.obtenerClasesPorDocente);

// Unirse a una clase con el código
router.post('/unirse', validarToken(), clasesController.unirseAClase);

module.exports = router;
