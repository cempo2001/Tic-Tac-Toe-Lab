/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], 
  [0, 3, 6], [1, 4, 7], [2, 5, 8], 
  [0, 4, 8], [2, 4, 6]            
];
/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.querySelector('#message');
const resetBtnEl = document.querySelector('#reset');

/*-------------------------------- Functions --------------------------------*/
const render = () => {
  updateBoard();
  updateMessage();
};

const updateBoard = () => {
  board.forEach((squareValue, index) => {
    squareEls[index].textContent = squareValue;
  });
};

const updateMessage = () => {
  if (!winner && !tie) {
    messageEl.textContent = `It is ${turn}'s turn!`;
  } else if (!winner && tie) {
    messageEl.textContent = "It's a tie game!";
  } else {
    messageEl.textContent = `Congratulations! ${turn} wins!`;
  }
};

const handleClick = (event) => {
  const squareIndex = parseInt(event.target.id);

  
  if (board[squareIndex] !== '' || winner || tie) return;

  placePiece(squareIndex);
  checkForWinner();
  checkForTie();
  switchPlayerTurn();
  render();
};

const placePiece = (index) => {
  board[index] = turn;
};

const checkForWinner = () => {
  for (let combo of winningCombos) {
    if (board[combo[0]] !== '' && 
        board[combo[0]] === board[combo[1]] && 
        board[combo[0]] === board[combo[2]]) {
      winner = true;
      return;
    }
  }
};

const checkForTie = () => {
  if (winner) return;
  tie = board.every(square => square !== '');
};

const switchPlayerTurn = () => {
  if (winner || tie) return;
  turn = turn === 'X' ? 'O' : 'X';
};

const init = () => {
  board = ['', '', '', '', '', '', '', '', ''];
  turn = 'X';
  winner = false;
  tie = false;
  render();
};

/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach(square => {
  square.addEventListener('click', handleClick);
});

if (resetBtnEl) {
  resetBtnEl.addEventListener('click', init);
}


init();
