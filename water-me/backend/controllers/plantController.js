const plantDB = require('../database/db').plantDB;
const Plant = require('../models/Plant');

exports.getAllPlants = (req, res) => {
     Plant.findAll().then((plants) => {
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
    
    const { nom, type, frequenceArrosage, description, photo, userId } = req.body;

    Plant.createPlantWithAllFields(nom, type, frequenceArrosage, userId, description, photo)
        .then((insertedPlant) => {
            res.json({ message: 'Plante créée', plant: insertedPlant });
        })
        .catch((err) => {
            res.status(500).json({ error: 'Erreur lors de la création de la plante', details: err });
        });
}

exports.updatePlant = (req, res) => {
    if (!req.body.id) return res.status(400).json({ message: 'ID de la plante manquant' });
    if (!req.body.name) return res.status(400).json({ message: 'Nom de la plante manquant' });
    if (!req.body.type) return res.status(400).json({ message: 'Type de la plante manquant' });
    if (!req.body.wateringFrequency) return res.status(400).json({ message: 'Fréquence d\'arrosage manquante' });

    plant = Plant.updatePlant(req.body.id, req.body.name, req.body.type, req.body.wateringFrequency)
    res.json({ message: 'Plante mise à jour' , plant });
}

exports.deletePlant = (req, res) => {
    if (!req.params.id) return res.json({ message: 'ID de la plante manquant' });

    Plant.deletePlant(req.params.id).then((plant) => {
        res.json({ message: 'Plante supprimée', plant });
    }).catch((err) => {
        res.status(500).json({ error: 'Erreur lors de la suppression de la plante', details: err });
    });
}