const plantDB = require('../database/db').plantDB;

// Modèle de plante
class Plant {
    constructor(name, type, wateringFrequency, userId, description, file) {
        this.name = name;
        this.type = type;
        this.wateringFrequency = wateringFrequency;
        this.userId = userId;
        this.description = description;
        this.file = file;
    }

    // Méthode pour trouver toutes les plantes
    static findAll() {
        return new Promise((resolve, reject) => {
            plantDB.find({}, (err, plants) => {
                if (err) {
                    reject(err);
                }
                resolve(plants);
            });
        });
    }

    // Méthode pour trouver toutes les plantes d'un utilisateur
    static findAllByUser(userId) {
        return new Promise((resolve, reject) => {
            plantDB.find({ userId }, (err, plants) => {
                if (err) {
                    reject(err);
                }
                resolve(plants);
            });
        });
    }

    // Méthode pour trouver une plante par son ID
    static findById(id) {
        return new Promise((resolve, reject) => {
            plantDB.findOne({ _id: id }, (err, plant) => {
                if (err) {
                    reject(err);
                }
                resolve(plant);
            });
        });
    }

    // Méthode pour créer une nouvelle plante avec tous les champs requis
    static createPlantWithAllFields(name, type, wateringFrequency, userId, description, file) {
        return new Promise((resolve, reject) => {
            const newPlant = new Plant(name, type, wateringFrequency, userId, description, file);
            plantDB.insert(newPlant, (err, insertedPlant) => {
                if (err) {
                    reject(err);
                }
                resolve(insertedPlant);
            });
        });
    }

    // Méthode pour mettre à jour une plante
    static updatePlant(id, name, type, wateringFrequency, description, file) {
        return new Promise((resolve, reject) => {
            plantDB.update({ _id: id }, { $set: { name, type, wateringFrequency, description, file } }, {}, (err, numReplaced) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (numReplaced === 0) {
                    reject(new Error("Aucun document n'a été mis à jour."));
                    return;
                }
                plantDB.findOne({ _id: id }, (err, updatedPlant) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    if (!updatedPlant) {
                        reject(new Error("Le document mis à jour n'a pas été trouvé."));
                        return;
                    }
                    resolve(updatedPlant);
                });
            });
        });
    }
    

    // Méthode pour supprimer une plante
    static deletePlant(id) {
        return new Promise((resolve, reject) => {
            plantDB.remove({ _id: id }, {}, (err, numRemoved) => {
                if (err) {
                    reject(err);
                }
                resolve(numRemoved);
            });
        });
    }
}

module.exports = Plant;