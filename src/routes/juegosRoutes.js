const express = require('express');
const router = express.Router();
const juegosController = require('../controllers/juegosController');
const validarToken = require('../middlewares/validarToken'); // Middleware para validar el token

// Crear un nuevo juego
router.post('/juegos', validarToken(), juegosController.crearJuego);

// Obtener todos los juegos
router.get('/juegos', validarToken(), juegosController.obtenerJuegos);

// Obtener un juego por su ID
router.get('/juegos/:id_juego', validarToken(), juegosController.obtenerJuegoPorId);

// Modificar un juego
router.put('/juegos/:id_juego', validarToken(), juegosController.modificarJuego);

// Eliminar un juego
router.delete('/juegos/:id_juego', validarToken(), juegosController.eliminarJuego);

module.exports = router;
