const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;

const bg = new Image();
bg.src = 'assets/bg.jpg';

const hoopImg = new Image();
hoopImg.src = 'assets/hoop.png';

const ballImg = new Image();
ballImg.src = 'assets/ball.png';

const hoop = {
  x: canvas.width - 200,
  y: canvas.height / 3,
  width: 120,
  height: 100,
};

const ball = {
  x: 100,
  y: canvas.height - 100,
  radius: 30,
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
  ctx.drawImage(hoopImg, hoop.x, hoop.y, hoop.width, hoop.height);
}

function drawBall() {
  ctx.drawImage(ballImg, ball.x - ball.radius, ball.y - ball.radius, ball.radius * 2, ball.radius * 2);
}

function update() {
  if (ball.inAir) {
    ball.dy += 0.5; // gravedad
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Suelo
    if (ball.y + ball.radius > canvas.height) {
      resetBall();
    }

    // Puntuación
    if (
      ball.x > hoop.x + 20 &&
      ball.x < hoop.x + hoop.width - 20 &&
      ball.y > hoop.y + 30 &&
      ball.y < hoop.y + 60
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

canvas.addEventListener("click
