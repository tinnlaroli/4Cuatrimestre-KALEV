// **Rutas (styleRoutes.js)**
const express = require('express');
const router = express.Router();
const styleController = require('../controllers/styleController');

router.get('/', styleController.getEstilos);
router.get('/:id', styleController.getEstiloById);
router.post('/', styleController.createEstilo);
router.put('/:id', styleController.updateEstilo);
router.delete('/:id', styleController.deleteEstilo);

module.exports = router;