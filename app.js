// Player Factory

const Player = function (name, sign, current) {

  this.playerName = name;
  this.playerSign = sign;
  this.isCurrentPlayer = current;
  this.isWinnner = false;

  return {
    playerName,
    playerSign,
    isCurrentPlayer,
    isWinnner
  }

};


// Game Controller

const GameController = (function() {

  let gameOver = true;
  const playerX = Player('playerX', 'x', true);
  const playerO = Player('playerO', 'o', false);


  // Event handler
  const startGame = function() {

    setPlayerNames();
    DisplayController.showBoard();
    DisplayController.hideGameStarter();
    gameOver = false;
    
  };

  // Event handler
  const placeSign = function() {

    if (!gameOver) {

      let pickedField = this.getAttribute('data-board-index');
  
      if (GameBoard.board[pickedField] === '') {
        
        if (playerX.isCurrentPlayer) {
          GameBoard.board[pickedField] = playerX.playerSign;
        } else {
          GameBoard.board[pickedField] = playerO.playerSign;
        }

        DisplayController.fillBoard();
        checkResult();
        switchPlayer();

      }

    }

  };

  const setPlayerNames = function() {

    playerX.playerName = DisplayController.getPlayerXName();
    playerO.playerName = DisplayController.getPlayerOName();
    
  };

  const switchPlayer = function() {

    if (playerX.isCurrentPlayer) {
      playerX.isCurrentPlayer = false;
      playerO.isCurrentPlayer = true;
    } else {
      playerX.isCurrentPlayer = true;
      playerO.isCurrentPlayer = false;
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

      if (combo.every( sign => sign === 'x')) {

        playerX.isWinnner = true;
        return true; // exits some() function

      } else if (combo.every( sign => sign === 'o')) {

        playerO.isWinnner = true;
        return true; // exits some() function

      }

    })) {

      endGame();

    }
    
  };
  
  const endGame = function() {

    if (playerX.isWinnner) {
        
      console.log('game over');
      console.log(`${playerX.playerName} wins`);
      
    } else if (playerO.isWinnner) {
      
      console.log('game over');
      console.log(`${playerO.playerName} wins`);

    } else {

      console.log('game over');
      console.log(`its a draw`);
      
    }

    gameOver = true;

  };

  return {
    placeSign,
    startGame,
    playerX
  };

})();


// Display Controller

const DisplayController = (function() {

  const playerXUI = document.querySelector('#player-x');
  const playerOUI = document.querySelector('#player-o');
  const startButtonUI = document.querySelector('#start-button');
  const boardUI = document.querySelector('#gameboard');
  const gameStarterUI = document.querySelector('#game-start');

  const fillBoard = function() {

    for (let i = 0; i < GameBoard.board.length; i++) {
      GameBoard.boardFieldsUI[i].textContent = GameBoard.board[i];
    }

  };

  const showBoard = function() {

    boardUI.classList.remove('is-hidden');

  };

  const getPlayerXName = () => playerXUI.value;
  const getPlayerOName = () => playerOUI.value;

  const hideGameStarter = function() {

    gameStarterUI.classList.add('is-hidden');
    
  };

  // Event Listener
  startButtonUI.addEventListener('click', GameController.startGame);

  return {
    fillBoard,
    getPlayerXName,
    getPlayerOName,
    showBoard,
    hideGameStarter
  }

})();


// Game Board

const GameBoard = (function() {

  const boardFieldsUI = document.querySelectorAll('.board-field'); 
  const board = ['', '', '', '', '', '', '', '', ''];

  // Event listeners
  boardFieldsUI.forEach( field => { field.addEventListener('click', GameController.placeSign) });

  return {
    board,
    boardFieldsUI
  }

})();