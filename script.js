const canvas = document.getElementById("heartsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

function randomColor() {
  const colors = ["#ff4d6d", "#ff99ac", "#c77dff", "#80ed99", "#ffd166", "#5dade2"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function createHeart() {
  hearts.push({
    x: Math.random() * canvas.width,
    y: canvas.height + 20,
    size: Math.random() * 20 + 10,
    speed: Math.random() * 1 + 0.5,
    color: randomColor(),
    opacity: Math.random()
  });
}

function drawHeart(x, y, size, color, opacity) {
  ctx.globalAlpha = opacity;
  ctx.fillStyle = color;

  ctx.beginPath();
  ctx.moveTo(x, y);

  ctx.bezierCurveTo(x - size, y - size, x - size * 2, y + size / 2, x, y + size);
  ctx.bezierCurveTo(x + size * 2, y + size / 2, x + size, y - size, x, y);

  ctx.fill();
  ctx.globalAlpha = 1;
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (hearts.length < 100) {
    createHeart();
  }

  hearts.forEach((heart, index) => {
    heart.y -= heart.speed;

    drawHeart(heart.x, heart.y, heart.size, heart.color, heart.opacity);

    if (heart.y < -20) {
      hearts.splice(index, 1);
    }
  });

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
