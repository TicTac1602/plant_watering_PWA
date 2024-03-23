import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css'; 
import logo from '../assets/logo.png';

function LoginPage({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleToggleMode = () => {
    setIsRegistering(!isRegistering);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let response;
      if (isRegistering) {
        // Envoi des données d'inscription au serveur
        response = await axios.post('http://localhost:5500/auth/register', {
          username,
          email,
          password
        });
      } else {
        // Envoi des données de connexion au serveur
        response = await axios.post('http://localhost:5500/auth/login', {
          username,
          password
        });
      }

      console.log('Réponse du serveur:', response.data.message);
      if (response.data.token) 
        localStorage.setItem('token', response.data.token);
      // Si l'action réussit, on appelle la fonction de rappel
      onLogin();
    } catch (error) {
      console.error('Erreur lors de l\'opération:', error.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <img src={logo} alt="Water Me" className="logo" />
      <h1 className="login-heading">{isRegistering ? 'Inscription' : 'Connexion'}</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Nom d'utilisateur:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        {isRegistering && (
          <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
        )}
        <label>
          Mot de passe:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit" className="login-button">
          {isRegistering ? 'S\'Inscrire' : 'Se Connecter'}
        </button>
      </form>
      <button onClick={handleToggleMode} className="toggle-mode-button">
        {isRegistering ? 'Déjà un compte ? Se connecter' : 'Pas encore de compte ? S\'inscrire'}
      </button>
    </div>
  );
}

export default LoginPage;
