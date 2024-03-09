const express = require('express');
const router = express.Router();
const authController = require('../controllers/plantController');

router.get('/', authController.getAllPlants);
router.get('/:id', authController.getOnePlant);
router.get('/user/:id', authController.getAllPlantsByUser);
router.post('/', authController.createPlant);
router.put('/:id', authController.updatePlant);
router.delete('/:id', authController.deletePlant);

module.exports = router;