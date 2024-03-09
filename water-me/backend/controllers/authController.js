const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.login = async (req, res) => {
    const { username, password } = req.body;
  
    try {
        // Vérifie si l'utilisateur existe dans la base de données
        const userFound = await User.findByUsername(username);
    
        // Si l'utilisateur n'existe pas
        if (!userFound) {
            return res.status(401).json({ message: 'Adresse e-mail ou mot de passe incorrect' });
        }
    
        // Vérifie si le mot de passe est correct
        if (userFound.password !== password) {
            return res.status(401).json({ message: 'Adresse e-mail ou mot de passe incorrect' });
        }
    
        // Génère un token JWT
        const token = jwt.sign({ userId: userFound._id }, 'secret key', { expiresIn: '24h' });
    
        // Envoie le token JWT au client
        res.status(200).json({ message: 'Utilisateur connecté avec succès', token: token });
    } catch (error) {
        console.error('Erreur lors de la connexion:', error.message);
        res.status(500).json({ message: 'Erreur lors de la connexion' });
    }
  };

  exports.register = async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
        // Vérifie si l'utilisateur existe déjà dans la base de données
        const existingMailUser = await User.findByEmail(email);
        const existingUser = await User.findByUsername(username);

        // Si l'utilisateur existe déjà
        if (existingUser || existingMailUser) {
            res.status(400).json({ message: 'Cet e-mail ou nom est déjà utilisé' });
            return;
        }

        // Enregistre l'utilisateur dans la base de données
        const user = await User.createUser(username, email, password);

        // renvoie un jeton JWT au client
        const token = jwt.sign({ userId: user._id }, 'secret key', { expiresIn: '24h' });

        // Répond avec un message de succès
        res.status(201).json({ message: 'Utilisateur enregistré avec succès', token: token});
    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error.message);
        res.status(500).json({ message: 'Erreur lors de l\'inscription' });
    }
  };
