// Player Factory

const Player = function (sign) {

  this.playerSign = sign;

  return {
    playerSign
  }

};


// Game Controller

const GameController = (function() {

  let gameOver = false;
  const player1 = Player('x');
  const player2 = Player('o');
  let currentPlayer = player1;
  let winnerSign = '';


  // Event handler
  const placeSign = function() {

    if (!gameOver) {

      let pickedField = this.getAttribute('data-board-index');
  
      if (GameBoard.board[pickedField] === '') {
        
        GameBoard.board[pickedField] = currentPlayer.playerSign;
        DisplayController.fillBoard();
        checkResult();
        switchPlayer();
      }

    }

  }


  const switchPlayer = function() {

    if (currentPlayer.playerSign === 'x') {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }

  };


  const checkResult = function() {

    let combinations = [
      [GameBoard.board[0], GameBoard.board[1], GameBoard.board[2]],
      [GameBoard.board[3], GameBoard.board[4], GameBoard.board[5]],
      [GameBoard.board[6], GameBoard.board[7], GameBoard.board[8]],
      [GameBoard.board[0], GameBoard.board[3], GameBoard.board[6]],
      [GameBoard.board[1], GameBoard.board[4], GameBoard.board[7]],
      [GameBoard.board[2], GameBoard.board[5], GameBoard.board[8]],
      [GameBoard.board[0], GameBoard.board[4], GameBoard.board[8]],
      [GameBoard.board[2], GameBoard.board[4], GameBoard.board[6]]
    ];

    // if there are not empty elements, end game
    if (!GameBoard.board.some( sign => sign === '')) {
      
      endGame();
      
    // if some of combinations where every element is x or 0, end game 
    } else if (combinations.some( combo => {

      if (combo.every( sign => sign === 'x') || combo.every( sign => sign === 'o')) {
        winnerSign = currentPlayer.playerSign;
        return true; // return of some() function
      } 

    })) {

      endGame();

    }
    
  };
  

  const endGame = function() {

    if (winnerSign === '') {
        
      console.log('game over');
      console.log(`its a draw`);
      gameOver = true;
      
    } else {
      
      console.log('game over');
      console.log(`${currentPlayer.playerSign} wins`);
      gameOver = true;

    }

  };

  return {
    placeSign
  };

})();


// Display Controller

const DisplayController = (function() {

  const fillBoard = function() {

    for (let i = 0; i < GameBoard.board.length; i++) {
      GameBoard.boardUI[i].textContent = GameBoard.board[i];
    }

  };

  return{
    fillBoard
  }

})();


// Game Board

const GameBoard = (function() {

  const boardUI = document.querySelectorAll('.board-field'); 
  const board = ['', '', '', '', '', '', '', '', ''];

  // Event listeners
  boardUI.forEach( field => { field.addEventListener('click', GameController.placeSign) });

  return {
    board,
    boardUI
  }

})();