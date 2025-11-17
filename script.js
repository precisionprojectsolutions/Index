// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    /* ==================================================
    == 1. MOBILE MENU TOGGLE
    =================================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            // Change icon to 'X' or '☰'
            menuToggle.innerHTML = mainNav.classList.contains('active') ? '&#10005;' : '&#9776;';
        });
    }

    /* ==================================================
    == 2. HERO CAROUSEL
    =================================================== */
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.carousel-dots');
    let currentSlide = 0;
    let slideInterval;

    if (slides.length > 0) {
        // Create dots
        slides.forEach((slide, index) => {
            const dot = document.createElement('span');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                showSlide(index);
                resetInterval();
            });
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.carousel-dot');

        function showSlide(index) {
            // Remove active class from current slide and dot
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            
            // Set new current slide
            currentSlide = index;
            
            // Add active class to new slide and dot
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function showNextSlide() {
            const nextSlide = (currentSlide + 1) % slides.length;
            showSlide(nextSlide);
        }

        function resetInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(showNextSlide, 5000); // 5 seconds
        }

        // Start the carousel
        resetInterval();
    }
    
    /* ==================================================
    == 3. ANIMATE ON SCROLL (AOS) INITIALIZATION
    =================================================== */
    AOS.init({
        duration: 800,  // Animation duration
        easing: 'ease-in-out', // Easing function
        once: true,     // Whether animation should happen only once
        delay: 100,     // Delay in ms
        offset: 120     // Offset (in px) from the original trigger point
    });

});
