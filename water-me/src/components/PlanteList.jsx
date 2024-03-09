import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './planteList.css';

function PlanteList() {
  const [plantes, setPlantes] = useState([
    {
      id: 1,
      nom: 'Basilic',
      type: 'Herbe'
    },
    {
      id: 2,
      nom: 'Menthe',
      type: 'Herbe'
    },
    {
      id: 3,
      nom: 'Tomate',
      type: 'Légume'
    },
  ]);

  useEffect(() => {
    // Ici, tu feras une requête pour récupérer la liste des plantes depuis ton API
    axios.get('URL_DE_TON_API/plantes')
      .then(response => {
        setPlantes(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des plantes:', error);
      });
  }, []);

  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/plante/${id}`);
  }

  const handleDelete = (id) => {
    // Ici, tu feras une requête pour supprimer la plante depuis ton API
    axios.delete(`URL_DE_TON_API/plante/${id}`)
      .then(response => {
        console.log('Plante supprimée:', response.data);
        // Ici, tu mettras à jour la liste des plantes
        setPlantes(plantes.filter(plante => plante.id !== id));
      })
      .catch(error => {
        console.error('Erreur lors de la suppression de la plante:', error);
      });
  }

  return (
    <div className="plante-list">
      <h1>Liste des Plantes</h1>
      <button className="add-button" onClick={() => navigate('/plante/ajouter')}>Ajouter une Plante</button>
      <ul className="plante-items">
        {plantes.map(plante => (
          <li key={plante.id} className="plante-item">
            <div className="plante-info">
              <span className="plante-name">{plante.nom}</span>
              <span className="plante-type">{plante.type}</span>
            </div>
            <div className="plante-actions">
              <button className="edit-button" onClick={() => handleEdit(plante.id)}>Editer</button>
              <button className="delete-button" onClick={() => handleDelete(plante.id)}>Supprimer</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlanteList;
