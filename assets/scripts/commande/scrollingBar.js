const scrollContainer = document.getElementById('scrollContainer');
const scrollLeft = document.getElementById('scrollLeft');
const scrollRight = document.getElementById('scrollRight');

scrollLeft.onclick = function () {
  scrollContainer.scrollBy({
    left: -200,
    behavior: 'smooth'
  });
};

scrollRight.onclick = function () {
  scrollContainer.scrollBy({
    left: 200,
    behavior: 'smooth'
  });
};