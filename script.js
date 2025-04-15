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
  // Tablero
  ctx.fillStyle = "#ccc";
  ctx.fillRect(hoop.x - 10, hoop.y - 40, 80, 40);
  // Aro
  ctx.fillStyle = "#e53935";
  ctx.fillRect(hoop.x, hoop.y, hoop.width, hoop.height);
  // Red (líneas)
  ctx.strokeStyle = "white";
  ctx.beginPath();
  ctx.moveTo(hoop.x, hoop.y + hoop.height);
  ctx.lineTo(hoop.x + hoop.width, hoop.y + hoop.height + 15);
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

function drawPalmTree() {
  // Tronco
  ctx.fillStyle = "#6d4c41";
  ctx.fillRect(50, canvas.height - 150, 20, 150);

  // Hojas
  ctx.fillStyle = "#2e7d32";
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.ellipse(60, canvas.height - 150, 60, 15, Math.PI / 4 * i, 0, Math.PI * 2);
    ctx.fill();
  }
}

function update() {
  if (ball.inAir) {
    ball.dy += 0.5;
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Suelo
    if (ball.y + ball.radius > canvas.height) {
      resetBall();
    }

    // Enceste
    if (
      ball.x > hoop.x &&
      ball.x < hoop.x + hoop.width &&
      ball.y > hoop.y &&
      ball.y < hoop.y + hoop.height + 10
    ) {
      score++;
      document.getElementById("score").textContent = score;
      resetBall();
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPalmTree();
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
    const angle = Math.random() * 0.4 + 0.2;
    const power = Math.random() * 6 + 12;
    ball.dx = Math.cos(angle) * power;
    ball.dy = -Math.sin(angle) * power;
    ball.inAir = true;
  }
});

gameLoop();
