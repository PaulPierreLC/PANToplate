function filterCards(category) {
    const container = document.querySelector('.row-cols-2.row-cols-lg-3.row-cols-xl-4');
    
    // Clear all current cards from the container
    container.innerHTML = '';

    // Filter and re-append cards based on the category
    allCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (cardCategory === category || category === 'all') {
            container.appendChild(card);  // Re-add matching cards
        }
    });
}

let allCards = [];

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    allCards = [...cards];  // Store a copy of the original cards
});

// Add click event listeners to all filter buttons
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        filterCards(category);
    });
});

// Show all cards by default on page load
window.onload = function() {
    filterCards('all');
};