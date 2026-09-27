// lenis smooth scroll
const lenis = new Lenis({
    duration: 1.5, // Speed of the inertia
    smoothWheel: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// horizontal scroll
const horizontalDiv = document.querySelector('.hor-scroll-container');

if (horizontalDiv) {
    horizontalDiv.addEventListener('wheel', (e) => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

        e.preventDefault();
        e.stopPropagation(); // <-- stops Lenis (listening on window) from ever seeing this event
        horizontalDiv.scrollLeft += e.deltaY;
    }, { passive: false });
}

// scroll buttons
document.querySelectorAll('.scroll-button').forEach(button => {
  button.addEventListener('click', (e) => {    
    const targetId = e.currentTarget.getAttribute('data-target');
    lenis.scrollTo(targetId, {
      offset: -180
    });
  });
});