let circleWrapper = document.getElementById("circle-decoration-wrapper");
let circle = document.getElementById("circle-decoration");
let circleStyle = window.getComputedStyle(circle);
let circlePaddingStr = circleStyle.getPropertyValue("padding");
let circlePadding = parseInt(circlePaddingStr);

let interacted = false;
const TRANSFORM_DUR = 100;

document.addEventListener('mousemove', function (e) {
  if (interacted == false) {
    circleWrapper.style.transform = `translate(${e.clientX - circlePadding}px, ${e.clientY - circlePadding}px)`;
    circleWrapper.style.visibility = 'visible';

    circleWrapper.offsetHeight; // to apply the changes before enabling the transition

    circleWrapper.style.transition = `transform ${TRANSFORM_DUR}ms`;
    interacted = true;
  } else {
    circleWrapper.style.transform = `translate(${e.clientX - circlePadding}px, ${e.clientY - circlePadding}px)`;
  }
});

document.querySelectorAll('a, button').forEach(function (el) {
  el.addEventListener('mouseenter', () => { circle.style.scale = '0' });
  el.addEventListener('mouseleave', () => { circle.style.scale = '1' });
});