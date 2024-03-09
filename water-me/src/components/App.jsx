import { createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginPage from "./LoginPage";
import PlanteForm from "./PlanteForm";
import PlanteList from "./PlanteList";
import { useState, useEffect } from 'react';
import './app.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Vérifie si l'utilisateur est authentifié
    const token = localStorage.getItem('token'); // Récupère le token JWT du stockage local
    if (verifyAuthentication(token)) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const verifyAuthentication = (token) => {
    // Ici, tu vérifieras si le token est valide en le décodant et en vérifiant s'il est expiré
    // Pour l'instant, on se contente de vérifier s'il est present
    return token !== null;
  }

  const router = createBrowserRouter([
    { path: "/", element: <PlanteList /> }, // Utilisation de l'élément pour spécifier le composant à rendre
    { path: "/plante/:id", element: <PlanteForm /> },
    { path: "/login", element: <LoginPage onLogin={() => setIsAuthenticated(true)}/> },
  ]);

  return (
    <div className="app-container">
      <div className="sidebar-left"></div>
      <div className="main-content">
        {isAuthenticated ? (
          <RouterProvider router={router} />
        ) : (
          <LoginPage onLogin={() => setIsAuthenticated(true)} />
        )}
      </div>
      <div className="sidebar-right"></div>
    </div>
  );
}

export default App;
