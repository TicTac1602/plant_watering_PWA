// Import des modules
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const plantRoutes = require('./routes/plantRoutes');
const cors = require('cors');

// Configuration de l'application Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware pour les requêtes entrantes
app.use(cors());
app.use(express.json());

// Montage des routes d'authentification
app.use('/auth', authRoutes);
app.use('/plants', plantRoutes);

// Route d'accueil
app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'application backend !');
});

// Route de test
app.get('/test', (req, res) => {
    res.json({ message: 'Ceci est un message de test depuis l\'API' });
});

// Route pour gérer les erreurs 404
app.use((req, res) => {
    res.status(404).send('La page demandée est introuvable.');
});

// Middleware pour gérer les erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Une erreur interne du serveur s\'est produite.');
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur backend en cours d'exécution sur le port ${PORT}`);
});
