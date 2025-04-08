document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const restaurantId = urlParams.get("id");

  if (!restaurantId) {
    window.location.href = "restaurants.html";
    return;
  }

  fetch(`http://localhost:8080/api/restaurants/${restaurantId}`)
    .then(response => response.json())
    .then(restaurant => {
      document.getElementById("restaurant-name").textContent = restaurant.nom;
      document.getElementById("restaurant-image").src = `/assets/images/restaurant/${restaurant.photo}`;
      document.getElementById("restaurant-capacite").textContent = `Capacité: ${restaurant.capacite} personnes`;
      document.getElementById("restaurant-telephone").textContent = `Téléphone: ${restaurant.telephone}`;
    })
    .catch(error => console.error("Error fetching restaurant details:", error));

  fetch(`http://localhost:8080/api/plats/restaurant/${restaurantId}`)
    .then(response => response.json())
    .then(plats => {
      const platsContainer = document.getElementById("plats-list");
      platsContainer.innerHTML = "";

      plats.forEach(plat => {
        const platCard = document.createElement("div");
        platCard.classList.add("col-5", "m-3", "card");
        platCard.innerHTML = `
          <div class="card-body">
            <h5 class="card-title">${plat.nom}</h5>
            <p class="card-text">${plat.prix}€ - ${plat.note}★</p>
            <p class="card-text"><small class="text-body-secondary">${plat.description}</small></p>
            <div class="d-grid gap-2 d-flex justify-content-end">
              <button class="btn btn-outline-dark rounded-3" type="button">+</button>
            </div>
          </div>
        `;
        platsContainer.appendChild(platCard);
      });
    })
    .catch(error => console.error("Error fetching plats:", error));
});