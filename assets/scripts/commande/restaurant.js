// // Get all filter buttons and list items
// const filterButtons = document.querySelectorAll('.filter-btn');
// const listItems = document.querySelectorAll('#listItems .list-group-item');
// const resetButton = document.getElementById('resetButton');

// // Function to filter items based on selected buttons
// function filterItems() {
//     const activeButtons = document.querySelectorAll('.filter-btn.active');

//     // Get the data-category values of all active buttons
//     const selectedCategories = Array.from(activeButtons).map(button => button.getAttribute('data-category'));

//     listItems.forEach(item => {
//         const itemCategory = item.getAttribute('data-category');

//         // Show the item if it matches any of the selected categories, or hide if none are selected
//         if (selectedCategories.length === 0 || selectedCategories.includes(itemCategory)) {
//             item.style.display = '';
//         } else {
//             item.style.display = 'none';
//         }
//     });
// }

// // Add event listeners to filter buttons
// filterButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         // Toggle the 'active' class to change button color
//         button.classList.toggle('active');

//         // Toggle the color classes based on active state
//         if (button.classList.contains('active')) {
//             button.classList.remove('btn-outline-primary');
//             button.classList.add('btn-primary');
//         } else {
//             button.classList.remove('btn-primary');
//             button.classList.add('btn-outline-primary');
//         }

//         // Apply the filtering
//         filterItems();
//     });
// });

// // Add event listener to the reset button
// resetButton.addEventListener('click', () => {
//     // Remove the 'active' class from all buttons and reset their styles
//     filterButtons.forEach(button => {
//         button.classList.remove('active');
//         button.classList.add('btn-outline-primary');
//         button.classList.remove('btn-primary');
//     });

//     // Reset the filter to show all items
//     filterItems();
// });

// // Initial filter (show all items initially)
// filterItems();

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
