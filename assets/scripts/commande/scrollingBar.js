// Select elements
const scrollContainer = document.getElementById('scrollContainer');
const scrollLeft = document.getElementById('scrollLeft');
const scrollRight = document.getElementById('scrollRight');

// Scroll left button functionality
scrollLeft.onclick = function() {
scrollContainer.scrollBy({ left: -200, behavior: 'smooth' });
};

// Scroll right button functionality
scrollRight.onclick = function() {
scrollContainer.scrollBy({ left: 200, behavior: 'smooth' });
};