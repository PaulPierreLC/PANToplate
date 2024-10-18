let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.carrousel-item');
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    
    const offset = -currentSlide * 100; 
    document.querySelector('.carrousel-wrapper').style.transform = `translateX(${offset}%)`;
}

function moveSlide(step) {
    showSlide(currentSlide + step);
}


showSlide(currentSlide);
