// Circle cursor

let circleWrapper = document.getElementById("circle-decoration-wrapper");
let circle = document.getElementById("circle-decoration");
let circleStyle = window.getComputedStyle(circle);
let circlePaddingStr = circleStyle.getPropertyValue("padding");
let circlePadding = parseInt(circlePaddingStr);

let interacted = false;
const TRANSFORM_DUR = 100;
let cursorX = null;
let cursorY = null;

document.addEventListener('mousemove', function (e) {
  cursorX = e.clientX;
  cursorY = e.clientY;

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

// ##################
// ### background ###
// ##################

// Canvas

let canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

resizeCanvas();

window.addEventListener('resize', function () {
  resizeCanvas();
});

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Particles

const N_PARTICLE = 150;
const X_VELOCITY_MULT = 1;
const Y_VELOCITY_MULT = 1;
const CURSOR_ATTRACTION_RADIUS = 180;
const MAX_CURSOR_ATTRACTION = 0.04; // higher is more attracton force
const MAX_PARTICLE_SPEED = 2;

class Particle {
  #posX;
  #posY;
  #velX;
  #velY;
  #size;
  #color;
  constructor(posX = 0.0, posY = 0.0, velX = 0.0, velY = 0.0, size = 1.0, color = '#ffffff') {
    this.#posX = posX;
    this.#posY = posY;
    this.#velX = velX;
    this.#velY = velY;
    this.#size = size;
    this.#color = color;
  }

  get x() { return this.#posX; }
  get y() { return this.#posY; }
  get velX() { return this.#velX; }
  get velY() { return this.#velY; }
  get size() { return this.#size; }
  get color() { return this.#color; }

  set x(posX) { this.#posX = posX; }
  set y(posY) { this.#posY = posY; }
  set velX(velX) { this.#velX = velX; }
  set velY(velY) { this.#velY = velY; }
  set size(size) { this.#size = size; }
  set color(color) { this.#color = color; }

  computeNextPos() {
    if (cursorX !== null && cursorY !== null) {
      const distanceX = cursorX - this.#posX;
      const distanceY = cursorY - this.#posY;
      const distance = Math.hypot(distanceX, distanceY);

      if (distance > 0 && distance < CURSOR_ATTRACTION_RADIUS) {
        const attraction = MAX_CURSOR_ATTRACTION * (1 - distance / CURSOR_ATTRACTION_RADIUS);
        this.#velX += distanceX / distance * attraction;
        this.#velY += distanceY / distance * attraction;

        const speed = Math.hypot(this.#velX, this.#velY);
        if (speed > MAX_PARTICLE_SPEED) {
          this.#velX = this.#velX / speed * MAX_PARTICLE_SPEED;
          this.#velY = this.#velY / speed * MAX_PARTICLE_SPEED;
        }
      }
    }

    this.#posX += this.#velX;
    this.#posY += this.#velY;

    this.collisionCheck();
  }

  collisionCheck() {
    const radius = this.#size;
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (this.#posX > width + radius) {
      this.#posX = -radius;
    } else if (this.#posX < -radius) {
      this.#posX = width + radius;
    }

    if (this.#posY > height + radius) {
      this.#posY = -radius;
    } else if (this.#posY < -radius) {
      this.#posY = height + radius;
    }

  }

  draw() {
    ctx.fillStyle = this.#color;
    ctx.beginPath();
    ctx.arc(this.#posX, this.#posY, this.#size, 0, Math.PI * 2);
    ctx.fill();
  }
}

let particlesArr = new Array();

for (let i = 0; i < N_PARTICLE; i++) {
  let posX = Math.random() * window.innerWidth;
  let posY = Math.random() * window.innerHeight;
  let velX = (Math.random() - 0.5) * X_VELOCITY_MULT;
  let velY = (Math.random() - 0.5) * Y_VELOCITY_MULT;
  let size = Math.random() * 2 + 1;

  particlesArr.push(new Particle(posX, posY, velX, velY, size, '#7a7a7a'));
}

// Animation

frame();

function frame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.shadowBlur = 5;
  ctx.shadowColor = "#7a7a7a";

  for (let particule of particlesArr) {
    particule.computeNextPos();
  }

  for (let particule of particlesArr) {
    particule.draw();
  }
  requestAnimationFrame(frame);
}