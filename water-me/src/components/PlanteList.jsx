import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './planteList.css';

function PlanteList() {
  const [plantes, setPlantes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [newPlante, setNewPlante] = useState({
    name: '',
    type: '',
    description: '',
    wateringFrequency: '',
    userId: '1',
    file: undefined
  });

  useEffect(() => {
    axios.get('http://localhost:5500/plants/').then(response => {
      if (response.data.plants.length !== 0) {
        setPlantes(response.data.plants);
      }
    }).catch (error => {
      console.error('Erreur lors de la récupération des plantes:', error);
    });
  }, []);

  const navigate = useNavigate();

  const handleEdit = (id) => {
    // Ouvrir le formulaire avec les données de la plante à éditer
    const plante = plantes.find(plante => plante._id === id);
    if (!plante) {
      console.error('Plante non trouvée:', id);
      return;
    }
    setNewPlante(plante);
    setShowModal(true);
    setModalMode('edit');
  };

  const handleCreatePlante = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token manquant');
      navigate('/login');
      return;
    }
  
    const formData = new FormData();
    formData.append('name', newPlante.name);
    formData.append('type', newPlante.type);
    formData.append('description', newPlante.description);
    formData.append('wateringFrequency', newPlante.wateringFrequency);
    formData.append('userId', newPlante.userId);
    formData.append('photo', newPlante.file); // Ajoutez le fichier à FormData
  
    axios.post('http://localhost:5500/plants', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Indiquez au serveur que vous envoyez des données multipart/form-data
        Authorization: `Bearer ${token}` // Ajoutez l'en-tête d'autorisation
      }
    })
    .then(response => {
      setPlantes([...plantes, response.data.plant]);
      setShowModal(false);
      // Réinitialiser les valeurs du formulaire de création
      setNewPlante({
        name: '',
        type: '',
        description: '',
        wateringFrequency: '',
        file: undefined // Remettez à zéro le fichier
      });
    })
    .catch(error => {
      console.error('Erreur lors de la création de la plante:', error);
    });
  };

  const handleUpdatePlante = () => {
    const formData = new FormData();
    formData.append('_id', newPlante._id);
    formData.append('name', newPlante.name);
    formData.append('type', newPlante.type);
    formData.append('description', newPlante.description);
    formData.append('wateringFrequency', newPlante.wateringFrequency);
    formData.append('photo', newPlante.file);
  
    axios.put(`http://localhost:5500/plants/${newPlante._id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', 
      }
    })
    .then(response => {
      const newPlante = response.data.plant;
      const updatedPlantes = plantes.map(plante =>
        plante._id === newPlante._id ? newPlante : plante
      );

      setPlantes(updatedPlantes);
      setShowModal(false);
      setModalMode('create');
      // Réinitialiser les valeurs du formulaire de création
      setNewPlante({
        name: '',
        type: '',
        description: '',
        wateringFrequency: '',
        file: undefined // Remettez à zéro le fichier
      });
    })
    .catch(error => {
      console.error('Erreur lors de la mise à jour de la plante:', error);
    });
  };
  

  const handleDelete = (id) => {
    // Envoyer une requête de suppression de la plante au serveur
    axios.delete(`http://localhost:5500/plants/${id}`)
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
      <button className="add-button" onClick={() => {setShowModal(true); setModalMode('create')}}>Ajouter une Plante</button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Créer une Nouvelle Plante</h2>
            <form>
              <label>Nom de la plante:</label>
              <input
                type="text"
                value={newPlante.name}
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
                value={newPlante.wateringFrequency}
                onChange={(e) => setNewPlante({ ...newPlante, wateringFrequency: e.target.value })}
              />
              <label>Photo:</label>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => setNewPlante({ ...newPlante, file: e.target.files[0] })}
              />
              <button type="button" onClick={modalMode === 'create' ? handleCreatePlante : handleUpdatePlante}>{modalMode === 'create' ? 'Créer' : 'Editer'}</button>
            </form>
          </div>
        </div>
      )}
      <ul className="plante-items">
      {plantes.map(plante => (
        <div key={plante._id} className="plante-card">
        <div className="plante-info">
          {plante.file && <img src={plante.file} alt={plante.name} className="plante-image" />}
          <span className="plante-name">{plante.name}</span>
          <span className="plante-type">{plante.type}</span>
        </div>
        <div className="plante-actions">
          <button className="edit-button" onClick={() => handleEdit(plante._id)}>
            <i className="fas fa-edit"></i>
          </button>
          <button className="delete-button" onClick={() => handleDelete(plante._id)}>
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
      ))}
      </ul>
    </div>
  );
}

export default PlanteList;
