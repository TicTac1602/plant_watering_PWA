const express = require('express');
const fs = require('fs');
const router = express.Router();
const path = require('path');
const imageDirectory = path.join(__dirname, '../database/uploads');
const plantController = require('../controllers/plantController');

const multer = require('multer');

const uploadDir = 'backend/database/uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Spécifiez le dossier où vous souhaitez stocker les fichiers téléchargés
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Utilisez le nom de fichier original
  }
});

const upload = multer({ storage: storage });


router.get('/', plantController.getAllPlants);
router.get('/:id', plantController.getOnePlant);
router.get('/user/:id', plantController.getAllPlantsByUser);
router.post('/', upload.single('photo'), plantController.createPlant);
router.put('/:id',upload.single('photo'), plantController.updatePlant);
router.delete('/:id', plantController.deletePlant);
router.get('/images/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  res.sendFile(path.join(imageDirectory, imageName));
});

module.exports = router;