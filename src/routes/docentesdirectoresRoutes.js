const express = require('express');
const docentesController = require('../controllers/docentesController');
const directoresController = require('../controllers/directoresController');

const router = express.Router();

// Rutas para Docentes
router.post('/docentes', docentesController.crearDocente);
router.get('/docentes', docentesController.obtenerDocentes);
router.get('/docentes/:id_docente', docentesController.obtenerDocentePorId);
router.put('/docentes/:id_docente', docentesController.modificarDocente);
router.delete('/docentes/:id_docente', docentesController.eliminarDocente);

// Rutas para Directores
router.post('/directores', directoresController.crearDirector);
router.get('/directores', directoresController.obtenerDirectores);
router.get('/directores/:id_director', directoresController.obtenerDirectorPorId);
router.put('/directores/:id_director', directoresController.modificarDirector);
router.delete('/directores/:id_director', directoresController.eliminarDirector);

module.exports = router;
