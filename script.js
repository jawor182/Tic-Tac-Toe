const container = document.querySelector('.container');
const winMessage = document.createElement('div');
const body = document.querySelector('body');
winMessage.classList.add('win-message');
winMessage.style.display = 'none';
container.after(winMessage);
body.appendChild(winMessage);
const rows = 3;
const cols = 3;

for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        const panel = document.createElement('div');
        panel.className = 'panel';
        panel.id = `${i}-${j}`;
        container.appendChild(panel);
    }
}

class Player {
    constructor(marker) {
        this.marker = marker;
    }
}

const Player1 = new Player("X");
const Player2 = new Player("O");

class TicTacToe { 
    constructor() {
        this.turn = 1;
        this.board = Array.from({ length: rows }, () => Array(cols).fill(null));
        this.gameEnded = false;
    }

    currentPlayer() {
        return this.turn % 2 !== 0 ? Player1 : Player2;
    }

    startGame() {
      container.addEventListener("click", (event) => {
          if (!event.target.classList.contains('panel') || event.target.textContent !== '') {
              return;
          }
          
          if (this.gameEnded) {
              return;
          }
          
          const currentPlayer = this.currentPlayer();
          event.target.textContent = currentPlayer.marker;
          const [row, col] = event.target.id.split('-');
          this.makeMove(parseInt(row), parseInt(col));
         
          if (this.checkForWin()) {
              const winningPlayer = this.currentPlayer();
              winMessage.textContent = `Player ${winningPlayer.marker} won!`;
              winMessage.style.display = 'block';
              this.gameEnded = true;
          } else {
              this.switchPlayer();
              if (this.turn === 10) { //!Don't change this. It's not a bug but a feature!
                  winMessage.textContent = "The game is a tie!";
                  winMessage.style.display = 'block';
                  this.gameEnded = true;
              }
          }
      });
  }

    makeMove(row, col) {
        this.board[row][col] = this.currentPlayer().marker;
    }

    checkForWin() {
        const winningPossibilities = [
            [[0, 0], [0, 1], [0, 2]], // Row 0
            [[1, 0], [1, 1], [1, 2]], // Row 1
            [[2, 0], [2, 1], [2, 2]], // Row 2
            [[0, 0], [1, 0], [2, 0]], // Column 0
            [[0, 1], [1, 1], [2, 1]], // Column 1
            [[0, 2], [1, 2], [2, 2]], // Column 2
            [[0, 0], [1, 1], [2, 2]], // Diagonal from top-left to bottom-right
            [[2, 0], [1, 1], [0, 2]]  // Diagonal from top-right to bottom-left
        ];
        
        const board = this.board; // Access the game board from the TicTacToe instance

        // Iterate through the winning possibilities
        for (const possibility of winningPossibilities) {
          const [pos1, pos2, pos3] = possibility;
          const [row1, col1] = pos1;
          const [row2, col2] = pos2;
          const [row3, col3] = pos3;
      
          // Check if the markers of the three cells in the winning line are the same
          const marker1 = board[row1][col1];
          const marker2 = board[row2][col2];
          const marker3 = board[row3][col3];
      
          if (marker1 && marker1 === marker2 && marker2 === marker3) {
            return true;
          }
        }
       
        // No win condition found
        return false;
    }

    switchPlayer() {
        this.turn++;
    }

    resetGame() {
      this.turn = 1;
      this.gameEnded = false;
      this.board = Array.from({ length: rows }, () => Array(cols).fill(null)); // Reset the game board
      const panel = document.querySelectorAll('.panel');
      panel.forEach(element => {
          element.textContent = "";
      });
      winMessage.style.display = 'none';
  }
}

const game = new TicTacToe();
const resetBtn = document.querySelector('.resetBtn');
resetBtn.addEventListener('click', () => {
    game.resetGame();
});
game.startGame();
