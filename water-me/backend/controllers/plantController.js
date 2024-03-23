const plantDB = require('../database/db').plantDB;
const fs = require('fs');
const path = require('path');
const Plant = require('../models/Plant');
const imageDirectory = path.join(__dirname, '../database/uploads');


exports.getAllPlants = (req, res) => {
     Plant.findAll().then((plants) => {
        plants.forEach(plant => {
            if (plant.file) {
                // Ajoute l'image de la plante à l'objet (base 64)
                fileData = fs.readFileSync(path.join(imageDirectory, plant.file), { encoding: 'base64' });
                plant.file = `data:image/jpeg;base64,${fileData}`;
            }
        });
        res.json({ message: 'Liste de toutes les plantes', plants });
     }).catch((err) => {
        res.status(500).json({ error: 'Erreur lors de la récupération des plantes', details: err });
     });
}

exports.getOnePlant = (req, res) => {
    if (!req.body.id) return res.status(400).json({ message: 'ID de la plante manquant' });

    Plant.findById(req.body.id).then((plant) => {
        res.json({ message: 'Détails d\'une plante', plant});
    }).catch((err) => {
        res.status(500).json({ error: 'Erreur lors de la récupération de la plante', details: err });
    });
}

exports.getAllPlantsByUser = (req, res) => {
    if (!req.body.userId) return res.json({ message: 'ID de l\'utilisateur manquant' });

    Plant.findAllByUser(req.body.userId).then((plants) => {
        res.json({ message: 'Liste de toutes les plantes d\'un utilisateur', plants});
    }).catch((err) => {
        res.status(500).json({ error: 'Erreur lors de la récupération des plantes', details: err });
    });
}

exports.createPlant = (req, res) => {
    if (!req.body.name) return res.status(400).json({ message: 'Nom de la plante manquant' });
    if (!req.body.type) return res.status(400).json({ message: 'Type de la plante manquant' });
    if (!req.body.wateringFrequency) return res.status(400).json({ message: 'Fréquence d\'arrosage manquante' });
    if (!req.body.userId) return res.status(400).json({ message: 'ID de l\'utilisateur manquant' });
    
    const { name, type, wateringFrequency, description, userId } = req.body;
    const photoPath = req.file ? req.file.filename : undefined;

    Plant.createPlantWithAllFields(name, type, wateringFrequency, userId, description, photoPath)
        .then((insertedPlant) => {
            if (insertedPlant.file) {
                // Ajoute l'image de la plante à l'objet (base 64)
                fileData = fs.readFileSync(path.join(imageDirectory, insertedPlant.file), { encoding: 'base64' });
                insertedPlant.file = `data:image/jpeg;base64,${fileData}`;
            }
            res.json({ message: 'Plante créée', plant: insertedPlant });
        })
        .catch((err) => {
            res.status(500).json({ error: 'Erreur lors de la création de la plante', details: err });
        });
}

exports.updatePlant = (req, res) => {
    if (!req.body._id) return res.status(400).json({ message: 'ID de la plante manquant' });
    if (!req.body.name) return res.status(400).json({ message: 'Nom de la plante manquant' });
    if (!req.body.type) return res.status(400).json({ message: 'Type de la plante manquant' });
    if (!req.body.wateringFrequency) return res.status(400).json({ message: 'Fréquence d\'arrosage manquante' });

    const photoPath = req.file ? req.file.filename : undefined;

    Plant.updatePlant(req.body._id, req.body.name, req.body.type, req.body.wateringFrequency, req.body.description, photoPath).then((plant) => {
        if (plant.file) {
            // Ajoute l'image de la plante à l'objet (base 64)
            fileData = fs.readFileSync(path.join(imageDirectory, plant.file), { encoding: 'base64' });
            plant.file = `data:image/jpeg;base64,${fileData}`;
        }
        res.json({ message: 'Plante mise à jour' , plant });
    }).catch((err) => {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la plante', details: err });
    });
}

exports.deletePlant = (req, res) => {
    if (!req.params.id) return res.json({ message: 'ID de la plante manquant' });
    Plant.findById(req.params.id).then((plant) => {
        if (plant.file) {
            fs.unlinkSync(path.join(imageDirectory, plant.file));
        }
    }).catch((err) => {
        res.status(500).json({ error: 'Erreur lors de la suppression de la plante', details: err });
    });

    Plant.deletePlant(req.params.id).then((plant) => {
        res.json({ message: 'Plante supprimée', plant });
    }).catch((err) => {
        res.status(500).json({ error: 'Erreur lors de la suppression de la plante', details: err });
    });
}