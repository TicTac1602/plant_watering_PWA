import React, { useState } from 'react';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Ici, tu enverras les données de connexion à ton API pour authentifier l'utilisateur
    console.log('Données de connexion soumises:', { email, password });
    // Ici tu feras la vérification de l'authentification côté client ou tu enverras les données au serveur pour vérification
    localStorage.setItem('token', 'token');
    // Si l'authentification est réussie, tu appelles la fonction de rappel onLogin
    onLogin();
  };



  return (
    <div>
      <h1>Page de Connexion</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Mot de passe:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Se Connecter</button>
      </form>
    </div>
  );
}

export default LoginPage;
