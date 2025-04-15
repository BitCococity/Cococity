const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let score = 0;
let gravity = 0.4;

const hoop = {
  x: canvas.width - 160,
  y: canvas.height / 3,
  width: 100,
  height: 10,
};

const ball = {
  x: 100,
  y: canvas.height - 60,
  radius: 20,
  dx: 0,
  dy: 0,
  inAir: false,
};

function drawHoop() {
  ctx.fillStyle = "#FF4136";
  ctx.fillRect(hoop.x, hoop.y, hoop.width, hoop.height);
  ctx.beginPath();
  ctx.arc(hoop.x + hoop.width / 2, hoop.y + 5, 25, 0, Math.PI, false);
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#ffffff";
  ctx.stroke();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#FF851B";
  ctx.fill();
  ctx.strokeStyle = "#ffffff";
  ctx.stroke();
  ctx.closePath();
}

function resetBall() {
  ball.x = 100;
  ball.y = canvas.height - 60;
  ball.dx = 0;
  ball.dy = 0;
  ball.inAir = false;
}

function update() {
  if (ball.inAir) {
    ball.dy += gravity;
    ball.x += ball.dx;
    ball.y += ball.dy;

    // colisión con suelo
    if (ball.y + ball.radius > canvas.height) {
      resetBall();
    }

    // colisión con aro
    if (
      ball.x > hoop.x &&
      ball.x < hoop.x + hoop.width &&
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
    ball.dx = (hoop.x - ball.x) / 20 + Math.random() * 1.5;
    ball.dy = -10 - Math.random() * 5;
    ball.inAir = true;
  }
});

gameLoop();
