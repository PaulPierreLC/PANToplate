// function filterCards(category) {
//     const container = document.querySelector('.row-cols-2.row-cols-lg-3.row-cols-xl-4');
    
//     // Clear all current cards from the container
//     container.innerHTML = '';

//     // Filter and re-append cards based on the category
//     allCards.forEach(card => {
//         const cardCategory = card.getAttribute('data-category');
//         if (cardCategory === category || category === 'all') {
//             container.appendChild(card);  // Re-add matching cards
//         }
//     });
// }

// let allCards = [];

// document.addEventListener('DOMContentLoaded', () => {
//     const cards = document.querySelectorAll('.card');
//     allCards = [...cards];  // Store a copy of the original cards
// });

// // Show all cards by default on page load
// window.onload = function() {
//     filterCards('all');
// };

/////////////////////////////////////////////////////////////////////////

function filterRestaurants(categories) {
    const restaurantsContainer = document.getElementById("restaurantsContainer");
    let restaurants = restaurantsContainer.querySelectorAll('.col');
    console.log(categories)
    console.log(categories.length)

    restaurantsContainer.innerHTML = '';

    restaurants.forEach(restaurant => {
        const card = restaurant.querySelector('.card');
        const category = card.getAttribute('data-category');
        if (categories.length == 0 || categories.includes(category)) {
            restaurantsContainer.appendChild(restaurant);
        }
    });
}

document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', function (e) {
        const category = this.getAttribute('data-category');
        const index = categories_selected.indexOf(category);

        if (index > -1) {
            console.log("-", category)
            
            categories_selected.splice(index, 1); // https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array-in-javascript
        } else {
            console.log("+", category)
            categories_selected.push(category);
        }

        filterRestaurants(categories_selected);
    });
});

let categories_selected = [];

window.onload = function() {
    
};