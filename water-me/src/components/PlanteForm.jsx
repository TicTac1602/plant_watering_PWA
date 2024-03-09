import React, { useState } from 'react';

function PlanteForm() {
  const [nom, setNom] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Ici, tu enverras les données du formulaire à ton API pour enregistrer la plante
    console.log('Données soumises:', { nom, type });
  };

  return (
    <div>
      <h1>Formulaire de Plante</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nom de la Plante:
          <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
        </label>
        <label>
          Type de Plante:
          <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
        </label>
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
}

export default PlanteForm;
