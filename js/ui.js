document.addEventListener('DOMContentLoaded', function() {
    // nav menu
    const menus = document.querySelectorAll('.side-menu');
    M.Sidenav.init(menus, {edge: 'right'});
    // add plant form
    const forms = document.querySelectorAll('.side-form');
    M.Sidenav.init(forms, {edge: 'left'});
    var elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);
  });

  // render plant data
  const plants = document.querySelector('.plants');
  const renderPlant = (data, id) => {
    const html = `
      <div class="card-panel plant white row" data-id="${id}">
        <img src="/img/plant.png" alt="plant thumb">
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