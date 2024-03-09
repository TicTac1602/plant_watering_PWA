const userDB = require('../database/db').userDB;

// Modèle d'utilisateur
class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    // Méthode pour trouver un utilisateur par son nom d'utilisateur
    static findByUsername(username) {
        return new Promise((resolve, reject) => {
            userDB.findOne({ username }, (err, user) => {
                if (err) {
                    resolve(null);
                }
                resolve(user);
            });
        }) 
    }

    // Méthode pour trouver un utilisateur par son adresse e-mail
    static findByEmail(email) {
        return new Promise((resolve, reject) => {
            userDB.findOne({ email }, (err, user) => {
                if (err) {
                    resolve(null);
                } else {
                    resolve(user);
                }
            });
        });
    }

    // Méthode pour enregistrer un nouvel utilisateur
    static createUser(username, email, password) {
        return new Promise((resolve, reject) => {
            const newUser = new User(username, email, password); // Création de l'objet utilisateur
            userDB.insert(newUser, (err, insertedUser) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(insertedUser);
                }
            });
        });
    }


    // Méthode pour supprimer un utilisateur
    static deleteUser(username) {
        return new Promise((resolve, reject) => {
            userDB.remove({ username }, (err, numRemoved) => {
                if (err) {
                    reject(err);
                }
                resolve(numRemoved);
            });
        });
    }

    // Méthode pour mettre à jour un utilisateur
    static updateUser(username, updatedUser) {
        return new Promise((resolve, reject) => {
            userDB.update({ username }, { $set: updatedUser }, {}, (err, numReplaced) => {
                if (err) {
                    reject(err);
                }
                resolve(numReplaced);
            });
        });
    }

    // Méthode pour comparer le mot de passe de l'utilisateur
    comparePassword(password) {
        return this.password === password;
    }

    // Méthode pour modifier le mot de passe de l'utilisateur
    setPassword(password) {
        this.password = password;
    }
}

module.exports = User;