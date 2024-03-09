import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './planteList.css';

function PlanteList() {
  const [plantes, setPlantes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newPlante, setNewPlante] = useState({
    name: '',
    type: '',
    description: '',
    wateringFrequency: '',
    userId: '1',
    photo: ''
  });

  useEffect(() => {
    // Requête pour récupérer les plantes associées à l'utilisateur
    axios.get('http://localhost:5000/plants/')
      .then(response => {
        if (response.data.plants.length !== 0)
          setPlantes(response.data.plants);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des plantes:', error);
      });
  }, []);

  const navigate = useNavigate();

  const handleEdit = (id) => {
    // Rediriger l'utilisateur vers le formulaire d'édition de la plante
    navigate(`/plants/${id}`);
  };

  const handleCreatePlante = () => {
    // on remplace le userId par l'ID de l'utilisateur connecté contenu dans le token
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token manquant');
      navigate('/login');
      return;
    }
    // TODO: extraire l'ID de l'utilisateur du token
    // const userId = jwt_decode(token).id;

    // Envoyer les données de la nouvelle plante au serveur
    console.log('Nouvelle plante:', newPlante);
    axios.post('http://localhost:5000/plants', newPlante)
      .then(response => {
        console.log('Nouvelle plante ajoutée:', response.data.plant);
        setPlantes([...plantes, response.data.plant]);
        setShowModal(false);
        // Réinitialiser les valeurs du formulaire de création
        setNewPlante({
          name: '',
          type: '',
          description: '',
          wateringFrequency: '',
          photo: ''
        });
      })
      .catch(error => {
        console.error('Erreur lors de la création de la plante:', error);
      });
  };

  const handleDelete = (id) => {
    // Envoyer une requête de suppression de la plante au serveur
    axios.delete(`http://localhost:5000/plants/${id}`)
      .then(response => {
        // Mettre à jour la liste des plantes en supprimant la plante supprimée
        setPlantes(plantes.filter(plante => plante._id !== id));
      })
      .catch(error => {
        console.error('Erreur lors de la suppression de la plante:', error);
      });
  }

  return (
    <div className="plante-list">
      <h1>Liste des Plantes</h1>
      <button className="add-button" onClick={() => setShowModal(true)}>Ajouter une Plante</button>
      {/* Boîte de dialogue modale pour la création d'une nouvelle plante */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Créer une Nouvelle Plante</h2>
            <form>
              <label>Nom de la plante:</label>
              <input
                type="text"
                value={newPlante.nom}
                onChange={(e) => setNewPlante({ ...newPlante, name: e.target.value })}
              />
              <label>Type de plante:</label>
              <input
                type="text"
                value={newPlante.type}
                onChange={(e) => setNewPlante({ ...newPlante, type: e.target.value })}
              />
              <label>Description:</label>
              <textarea
                value={newPlante.description}
                onChange={(e) => setNewPlante({ ...newPlante, description: e.target.value })}
              />
              <label>Fréquence d'arrosage:</label>
              <input
                type="text"
                value={newPlante.frequenceArrosage}
                onChange={(e) => setNewPlante({ ...newPlante, wateringFrequency: e.target.value })}
              />
              <label>Photo:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewPlante({ ...newPlante, photo: e.target.files[0] })}
              />
              <button type="button" onClick={handleCreatePlante}>Créer</button>
            </form>
          </div>
        </div>
      )}
      <ul className="plante-items">
      {plantes.map(plante => (
        <li key={plante._id} className="plante-item">
          <div className="plante-info">
            <span className="plante-name">{plante.nom}</span>
            <span className="plante-type">{plante.type}</span>
          </div>
          <div className="plante-actions">
            <button className="edit-button" onClick={() => handleEdit(plante._id)}>Editer</button>
            <button className="delete-button" onClick={() => handleDelete(plante._id)}>Supprimer</button>
          </div>
        </li>
      ))}
      </ul>
    </div>
  );
}

export default PlanteList;
