const container = document.querySelector('.container')

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
let board = [];
panel = document.querySelectorAll('.panel');
panel.forEach((panelElement) => {
    board.push(panelElement);
  });

class Player {
    constructor(marker){
        this.marker = marker;
    }
}

const Player1 = new Player("X");
const Player2 = new Player("O");
class TicTacToe { 
    constructor() {
        this.board = board;
        this.turn = 1;
    }
    currentPlayer() {
        return this.turn % 2 !== 0 ? Player1 : Player2;
      }
      
    
      startGame() {
        panel.forEach((panelElement) => {
          panelElement.textContent = "";
        });
      
        while (true) {
          const currentPlayer = this.currentPlayer();
          this.makeMove();
      
          if (this.checkForDraw() || this.checkForWin()) {
            // Display the game result (win or draw)
            // You need to implement the logic to display the result on the UI
            // Then, break the loop to stop the game
            break;
          }
      
          this.switchPlayer();
        }
      }
   
    makeMove(){
        panel.forEach((element) =>{
            const currentPlayer = this.currentPlayer();
            element.addEventListener("click", function(event){
                event.preventDefault();
                event.target.textContent = currentPlayer.marker;
            })
           });
           this.switchPlayer()

    }
    checkForWin(){
    }
    checkForDraw(){}
    switchPlayer(){
        this.turn++
    }
}
let game = new TicTacToe();
game.makeMove();