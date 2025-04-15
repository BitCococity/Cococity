const board = document.getElementById("board");
const message = document.getElementById("message");
let cells = Array(9).fill("");
let currentPlayer = "X";
let gameActive = true;

function renderBoard() {
  board.innerHTML = "";
  cells.forEach((cell, index) => {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.textContent = cell;
    div.addEventListener("click", () => handleMove(index));
    board.appendChild(div);
  });
}

function handleMove(index) {
  if (!gameActive || cells[index] !== "") return;

  cells[index] = "X";
  renderBoard();
  if (checkWin("X")) {
    message.textContent = "¡Has ganado! 😎";
    gameActive = false;
    return;
  }

  if (!cells.includes("")) {
    message.textContent = "Empate 🤝";
    gameActive = false;
    return;
  }

  setTimeout(botMove, 500);
}

function botMove() {
  if (!gameActive) return;
  let emptyIndices = cells.map((val, i) => val === "" ? i : null).filter(v => v !== null);
  let choice = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  cells[choice] = "O";
  renderBoard();
  if (checkWin("O")) {
    message.textContent = "La máquina gana 🤖";
    gameActive = false;
  } else if (!cells.includes("")) {
    message.textContent = "Empate 🤝";
    gameActive = false;
  }
}

function checkWin(player) {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6]          // diagonals
  ];
  return wins.some(comb => comb.every(i => cells[i] === player));
}

function resetGame() {
  cells = Array(9).fill("");
  currentPlayer = "X";
  gameActive = true;
  message.textContent = "";
  renderBoard();
}

renderBoard();
