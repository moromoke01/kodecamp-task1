document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.swiper-container', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 3000, // Change this value to adjust the delay between slides (in milliseconds)
            disableOnInteraction: false,
        },
    });
});
