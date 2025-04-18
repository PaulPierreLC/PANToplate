document.addEventListener("DOMContentLoaded", function () {
	const restaurantListContainer = document.getElementById("restaurant_liste");

	function fetchRestaurants() {
		const xhr = new XMLHttpRequest();
		xhr.open("GET", "http://localhost:8080/api/restaurants", true);

		xhr.onload = function () {
			if (xhr.status === 200) {
				try {
					const restaurants = JSON.parse(xhr.responseText);
					restaurantListContainer.innerHTML = "";

					restaurants.forEach((restaurant) => {
						const restaurantCard = document.createElement("div");
						restaurantCard.classList.add("w-48", "border", "m-2", "rounded");

						const restaurantLink = document.createElement("a");
						restaurantLink.href = `restaurant.html?id=${restaurant.id}`;
						restaurantLink.classList.add("card-title-link");
						restaurantLink.textContent = restaurant.nom;

						restaurantCard.innerHTML = `
                            <div class="row">
                                <img src="/assets/images/restaurant/${restaurant.photo}" alt="${restaurant.nom}" class="img-fluid col">
                                <div class="w-100 col">
                                    <div class="card-body">
                                        <h5 class="card-title m-4"></h5> <!-- This will be replaced with the restaurant link -->
                                        <p class="card-text">
                                            <strong>Téléphone:</strong> 
                                            <a>${restaurant.telephone}</a>
                                        </p>
                                        <p class="card-text"><strong>Capacité:</strong> ${restaurant.capacite} personnes</p>
                                    </div>
                                </div>
                            </div>
                        `;

						restaurantCard.querySelector("h5").appendChild(restaurantLink);

						restaurantListContainer.appendChild(restaurantCard);
					});
				} catch (error) {
					console.error("Error parsing API response:", error);
				}
			} else {
				console.error("Failed to fetch restaurants. Status:", xhr.status);
			}
		};

		xhr.onerror = function () {
			console.error("Request failed");
		};

		xhr.send();
	}

	fetchRestaurants();
});