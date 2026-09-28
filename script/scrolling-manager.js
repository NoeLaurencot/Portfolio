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

// scroll buttons
document.querySelectorAll('.scroll-button').forEach(button => {
  button.addEventListener('click', (e) => {    
    const targetId = e.currentTarget.getAttribute('data-target');
    lenis.scrollTo(targetId, {
      offset: -180
    });
  });
});