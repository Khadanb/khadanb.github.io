document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');

    // Subtle mouse move effect
    document.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;

        if (heroContent) {
            heroContent.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        }
    });

    // Reset transform on mouse leave
    document.addEventListener('mouseleave', () => {
        if (heroContent) {
            heroContent.style.transform = `rotateY(0deg) rotateX(0deg)`;
        }
    });

    console.log('Landing page initialized with premium effects.');
});
