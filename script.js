const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const throwSound = document.getElementById("throwSound");
const scoreSound = document.getElementById("scoreSound");

let score = 0;
let gravity = 0.5;

const hoop = {
  x: canvas.width - 150,
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
  image: new Image(),
};

ball.image.src = "https://upload.wikimedia.org/wikipedia/commons/7/7a/Basketball.png";

function drawHoop() {
  ctx.fillStyle = "#FF4136";
  ctx.fillRect(hoop.x, hoop.y, hoop.width, hoop.height);

  // red decorativa de canasta
  ctx.beginPath();
  ctx.arc(hoop.x + hoop.width / 2, hoop.y + 5, 30, 0, Math.PI, false);
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#ffffff";
  ctx.stroke();
}

function drawBall() {
  ctx.drawImage(ball.image, ball.x - ball.radius, ball.y - ball.radius, ball.radius * 2, ball.radius * 2);
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
      ball.y < hoop.y + 15
    ) {
      score++;
      document.getElementById("score").textContent = score;
      scoreSound.play();
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
    ball.dy = -10 - Math.random() * 4;
    ball.inAir = true;
    throwSound.play();
  }
});

gameLoop();
