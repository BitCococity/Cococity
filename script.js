const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;

const hoop = {
  x: canvas.width - 180,
  y: canvas.height / 3,
  width: 100,
  height: 10,
};

const ball = {
  x: 100,
  y: canvas.height - 100,
  radius: 20,
  dx: 0,
  dy: 0,
  inAir: false,
};

function resetBall() {
  ball.x = 100;
  ball.y = canvas.height - 100;
  ball.dx = 0;
  ball.dy = 0;
  ball.inAir = false;
}

function drawHoop() {
  ctx.fillStyle = "#ccc";
  ctx.fillRect(hoop.x - 10, hoop.y - 40, 80, 40); // tablero

  ctx.fillStyle = "#e53935";
  ctx.fillRect(hoop.x, hoop.y, hoop.width, hoop.height); // aro

  ctx.strokeStyle = "#fff";
  ctx.beginPath();
  ctx.moveTo(hoop.x, hoop.y + hoop.height);
  ctx.lineTo(hoop.x + hoop.width, hoop.y + hoop.height + 10);
  ctx.stroke();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#ff9800";
  ctx.fill();
  ctx.strokeStyle = "#fff";
  ctx.stroke();
  ctx.closePath();
}

function update() {
  if (ball.inAir) {
    ball.dy += 0.4; // gravedad
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y + ball.radius > canvas.height) {
      resetBall();
    }

    // encesta
    if (
      ball.x > hoop.x + 10 &&
      ball.x < hoop.x + hoop.width - 10 &&
      ball.y > hoop.y &&
      ball.y < hoop.y + 10
    ) {
      score++;
      document.getElementById("score").textContent = score;
      resetBall();
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawHoop();
  drawBall();
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

canvas.addEventListener("click", () => {
  if (!ball.inAir) {
    const angle = 0.3 + Math.random() * 0.2;
    const power = 12 + Math.random() * 5;
    ball.dx = Math.cos(angle) * power;
    ball.dy = -Math.sin(angle) * power;
    ball.inAir = true;
  }
});

gameLoop();
