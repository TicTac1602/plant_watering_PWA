// render plant data
const plants = document.querySelector('.plants');
const renderPlant = (data, id) => {
  const html = `
    <div class="card-panel plant white row" data-id="${id}">
      <img src="${data.imageUrl}" alt="plant thumb">
      <div class="plant-details">
        <div class="plant-title">${data.name}</div>
        <div class="plant-description">${data.description}</div>
      </div>
      <div class="plant-delete">
        <i class="material-icons" data-id="${id}">delete_outline</i>
      </div>
    </div>
  `;
  plants.innerHTML += html;
}

// remove plant data
const removePlant = (id) => {
  const plant = document.querySelector(`.plant[data-id="${id}"]`);
  plant.remove();
}

// Fonction pour calculer la prochaine date d'arrosage
function calculateNextWatering(lastWateredTimestamp, wateringFrequency) {
    const nextWatering = lastWateredTimestamp + (wateringFrequency * 24 * 60 * 60 * 1000);
    return nextWatering;
}

// Fonction pour appliquer la couleur d'arrière-plan en fonction de la date actuelle
function applyBackgroundColors(plant,id) {
    const today = new Date().getTime();
    const lastWateredTimestamp = plant.last_watered; // Suppose last_watered est un timestamp UNIX
    const wateringFrequency = plant.watering_span;
    const nextWateringDate = calculateNextWatering(lastWateredTimestamp, wateringFrequency);
    if (today > nextWateringDate) {
        const plantElement = document.querySelector(`.plant[data-id="${id}"]`);
        plantElement.classList.add("toBeWater"); // Couleur pour signaler qu'il faut arroser
    }
}