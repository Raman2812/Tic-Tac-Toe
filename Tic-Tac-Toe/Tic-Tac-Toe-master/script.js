const cells = document.querySelectorAll('.cell');
const statusDiv = document.getElementById('status');
const resetButton = document.getElementById('reset-button');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

// Winning combinations
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

// Handle player click
function handleCellClick(index) {
  if (board[index] !== '' || !gameActive) return;

  // Update board and cell
  board[index] = currentPlayer;
  cells[index].textContent = currentPlayer;
  cells[index].classList.add(currentPlayer);

  // Check for winner
  if (checkWinner()) {
    statusDiv.textContent = `${currentPlayer} Wins!`;
    gameActive = false;
  } else if (board.every(cell => cell !== '')) {
    statusDiv.textContent = "It's a Draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDiv.textContent = `${currentPlayer}'s Turn`;
  }
}

// Check for winner
function checkWinner() {
  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return board[a] === board[b] && board[b] === board[c] && board[a] !== '';
  });
}

// Reset game
function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  statusDiv.textContent = `${currentPlayer}'s Turn`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('X', 'O');
  });
}

// Attach event listeners to cells
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleCellClick(index));
});

// Reset button event listener
resetButton.addEventListener('click', resetGame);
