document.addEventListener("DOMContentLoaded", function () {
  const restaurantListContainer = document.getElementById("restaurant_liste");

  function fetchRestaurants() {
      fetch("http://localhost:8080/api/restaurants")
          .then(response => response.json())
          .then(restaurants => {
              restaurantListContainer.innerHTML = "";

              restaurants.forEach((restaurant) => {
                  const restaurantCard = document.createElement("div");
                  restaurantCard.classList.add("w-48", "border", "m-2", "rounded");

                  // Create a clickable link with the restaurant ID in the URL
                  const restaurantLink = document.createElement("a");
                  restaurantLink.href = `/src/commande/restaurant.html?id=${restaurant.id}`;
                  restaurantLink.classList.add("card-title-link");
                  restaurantLink.textContent = restaurant.nom;

                  // Build the card HTML
                  restaurantCard.innerHTML = `
                      <div class="row">
                          <img src="/assets/images/restaurant/${restaurant.photo}" alt="${restaurant.nom}" class="img-fluid col">
                          <div class="w-100 col">
                              <div class="card-body">
                                  <h5 class="card-title m-4"></h5> <!-- Restaurant name will be added here -->
                                  <p class="card-text"><strong>Téléphone:</strong> 
                                      <a href="tel:${restaurant.telephone}">${restaurant.telephone}</a>
                                  </p>
                                  <p class="card-text"><strong>Capacité:</strong> ${restaurant.capacite} personnes</p>
                              </div>
                          </div>
                      </div>
                  `;

                  // Append the restaurant name as a clickable link
                  restaurantCard.querySelector("h5").appendChild(restaurantLink);

                  // Append the card to the container
                  restaurantListContainer.appendChild(restaurantCard);
              });
          })
          .catch(error => console.error("Error fetching restaurants:", error));
  }

  fetchRestaurants();
});
