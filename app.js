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
    DisplayController.showPlayerNames();
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

    // if some of combinations where every element is x or 0, end game 
    if (combinations.some( combo => {

      if (combo.every( sign => sign === 'x')) {

        playerX.isWinnner = true;
        return true; // to exit some() function

      } else if (combo.every( sign => sign === 'o')) {

        playerO.isWinnner = true;
        return true; // to exit some() function

      }

    })) {

      endGame();

    // if there are no empty elements, end game
    } else if (!GameBoard.board.some( sign => sign === '')) {
      
      endGame();
      
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
    
    DisplayController.swapMouseIcons();

  };

  
  const endGame = function() {

    gameOver = true;

    if (playerX.isWinnner) {
        
      DisplayController.showResult(`${playerX.playerName} wins`);
      
    } else if (playerO.isWinnner) {
      
      DisplayController.showResult(`${playerO.playerName} wins`);
      
    } else {
      
      DisplayController.showResult(`It's a draw`);
      
    }

  };

  return {
    placeSign,
    startGame,
    playerX
  };

})();


// Display Controller

const DisplayController = (function() {

  const playerXInputUI = document.querySelector('#player-x');
  const playerOInputUI = document.querySelector('#player-o');
  const gameStarterUI = document.querySelector('#game-start');
  const startButtonUI = document.querySelector('#start-button');
  const boardUI = document.querySelector('#gameboard');
  const gameOnUI = document.querySelector('#game-on');
  const playerXNameUI = document.querySelector('#player-x-name');
  const playerONameUI = document.querySelector('#player-o-name');
  const mouseIcons = document.querySelectorAll('.mouse-icon');
  const gameOverUI = document.querySelector('#game-over');
  const resultUI = document.querySelector('#result');
  const restartButtonUI = document.querySelector('#restart-button');

  const fillBoard = function() {

    for (let i = 0; i < GameBoard.board.length; i++) {
      GameBoard.boardFieldsUI[i].textContent = GameBoard.board[i];
    }

  };

  const showBoard = function() {

    boardUI.classList.remove('is-hidden');

  };

  const showPlayerNames = function() {

    playerONameUI.textContent = getPlayerOName();
    playerXNameUI.textContent = getPlayerXName();
    gameOnUI.classList.remove('is-hidden');

  };

  const getPlayerXName = () => playerXInputUI.value;
  const getPlayerOName = () => playerOInputUI.value;

  const swapMouseIcons = function() {

    mouseIcons.forEach( icon => {
      icon.classList.toggle('is-hidden');
    })

  };

  const hideGameStarter = function() {

    gameStarterUI.classList.add('is-hidden');
    
  };

  const showResult = function(message) {

    gameOnUI.classList.add('is-hidden');
    resultUI.textContent = message;
    gameOverUI.classList.remove('is-hidden');
  };

  // Event Listener
  startButtonUI.addEventListener('click', GameController.startGame);

  return {
    fillBoard,
    getPlayerXName,
    getPlayerOName,
    showBoard,
    hideGameStarter,
    showPlayerNames,
    swapMouseIcons,
    showResult
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