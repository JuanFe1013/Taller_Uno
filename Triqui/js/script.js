const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const checkWinner = () => {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      cells[a].innerText &&
      cells[a].innerText === cells[b].innerText &&
      cells[a].innerText === cells[c].innerText
    ) {
      gameActive = false;
      document.getElementById('message').innerText = `${currentPlayer} ha ganado!`;
      break;
    }
  }
};

const checkDraw = () => {
  let isDraw = true;
  for (let cell of cells) {
    if (!cell.innerText) {
      isDraw = false;
      break;
    }
  }
  if (isDraw) {
    gameActive = false;
    document.getElementById('message').innerText = 'Empate!';
  }
};

const togglePlayer = () => {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const makeMove = (index) => {
  if (!gameActive || cells[index].innerText) return;
  cells[index].innerText = currentPlayer;
  checkWinner();
  checkDraw();
  if (gameActive) togglePlayer();
};

const resetBoard = () => {
  cells.forEach(cell => cell.innerText = '');
  gameActive = true;
  document.getElementById('message').innerText = '';
  currentPlayer = 'X';
};
