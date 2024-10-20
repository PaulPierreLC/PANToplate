// Get all filter buttons and list items
const filterButtons = document.querySelectorAll('.filter-btn');
const listItems = document.querySelectorAll('#listItems .list-group-item');
const resetButton = document.getElementById('resetButton');

// Function to filter items based on selected buttons
function filterItems() {
    const activeButtons = document.querySelectorAll('.filter-btn.active');

    // Get the data-category values of all active buttons
    const selectedCategories = Array.from(activeButtons).map(button => button.getAttribute('data-category'));

    listItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');

        // Show the item if it matches any of the selected categories, or hide if none are selected
        if (selectedCategories.length === 0 || selectedCategories.includes(itemCategory)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

// Add event listeners to filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Toggle the 'active' class to change button color
        button.classList.toggle('active');

        // Toggle the color classes based on active state
        if (button.classList.contains('active')) {
            button.classList.remove('btn-outline-primary');
            button.classList.add('btn-primary');
        } else {
            button.classList.remove('btn-primary');
            button.classList.add('btn-outline-primary');
        }

        // Apply the filtering
        filterItems();
    });
});

// Add event listener to the reset button
resetButton.addEventListener('click', () => {
    // Remove the 'active' class from all buttons and reset their styles
    filterButtons.forEach(button => {
        button.classList.remove('active');
        button.classList.add('btn-outline-primary');
        button.classList.remove('btn-primary');
    });

    // Reset the filter to show all items
    filterItems();
});

// Initial filter (show all items initially)
filterItems();