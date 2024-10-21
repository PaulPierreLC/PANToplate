function filterCards(category) {
    const cards = document.querySelectorAll('.col'); // Select all card containers

    cards.forEach(card => {
      const cardCategory = card.getAttribute('data-category'); // Get the card's category

      if (category === 'all' || cardCategory === category) {
        card.querySelector('.card').classList.add('show'); // Show card if it matches
      } else {
        card.querySelector('.card').classList.remove('show'); // Hide card if it doesn't match
      }
    });
  }

  // Add click event listeners to all filter buttons
  const filterButtons = document.querySelectorAll('.filter-btn');

  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      const category = this.getAttribute('data-category'); // Get the category from the clicked button
      filterCards(category); // Call the filter function with the selected category
    });
  });

  // Show all cards by default on page load
  window.onload = function() {
    filterCards('all');
  };