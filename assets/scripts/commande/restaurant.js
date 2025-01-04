document.addEventListener("DOMContentLoaded", function () {
    const restaurantListContainer = document.getElementById("restaurant_liste");

    // Function to fetch restaurants from API
    function fetchRestaurants() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8080/api/restaurants", true);

        xhr.onload = function () {
            if (xhr.status === 200) {
                try {
                    const restaurants = JSON.parse(xhr.responseText);

                    // Clear the current list
                    restaurantListContainer.innerHTML = "";

                    // Populate with data from API
                    restaurants.forEach((restaurant) => {
                        const restaurantCard = document.createElement("div");
                        restaurantCard.classList.add("w-48", "border", "m-2", "rounded");

                        restaurantCard.innerHTML = `
                            <div class="row">
                                <img src="/assets/images/restaurant/${restaurant.photo}" alt="${restaurant.nom}" class="img-fluid col">
                                <div class="w-100 col">
                                    <div class="card-body">
                                        <h5 class="card-title m-4">${restaurant.nom}</h5>
                                        <p class="card-text">${restaurant.description}</p>
                                    </div>
                                </div>
                            </div>
                        `;

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

    // Fetch restaurants on page load
    fetchRestaurants();
});
