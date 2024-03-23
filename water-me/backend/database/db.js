// db.js
const Datastore = require('nedb');

// Créer une instance de base de données pour la collection "USER"
const userDB = new Datastore({ filename: './backend/database/database.db', autoload: true });

// Créer une instance de base de données pour la collection "PLANT"
const plantDB = new Datastore({ filename: './backend/database/plants.db', autoload: true });

// Définir les schémas des collections
const userSchema = {
    username: String,
    email: String,
    password: String
};

const plantSchema = {
    name: String,
    type: String,
    wateringFrequency: Number,
    userId: Number,
    description: String,
    file: String
};


module.exports = { userDB, plantDB, userSchema, plantSchema };
