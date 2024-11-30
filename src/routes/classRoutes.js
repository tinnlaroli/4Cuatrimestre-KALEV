// **Rutas (classRoutes.js)**
const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

// Ruta para crear una nueva clase
router.post('/', classController.crearClase);

// Ruta para obtener todas las clases
router.get('/', classController.obtenerClases);

// Ruta para obtener una clase por ID
router.get('/:id', classController.obtenerClasePorId);

// Ruta para actualizar una clase por ID
router.put('/:id', classController.actualizarClase);

// Ruta para eliminar una clase por ID
router.delete('/:id', classController.eliminarClase);

module.exports = router;

  