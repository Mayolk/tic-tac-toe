// Game board

const GameBoard = (function() {

  const gameboardArray = ['', '', '', '', '', '', '', '', ''];
  const gameboardUI = document.querySelectorAll('.board-field'); 

  const placeSign = function() {

    let pickedField = this.getAttribute('data-board-index');

    if (gameboardArray[pickedField] === '') {
      
      gameboardArray[pickedField] = currentPlayer.playerSign;
      fillBoard();
      GameEngine.switchPlayer();
    }

  }

  const fillBoard = function() {

    for (let i = 0; i < gameboardArray.length; i++) {
      gameboardUI[i].textContent = gameboardArray[i];
    }

  };

  gameboardUI.forEach( field => { field.addEventListener('click', placeSign) });

  return {

  };

}());


// Game engine

const GameEngine = (function() {

  const switchPlayer = function() {

    if (currentPlayer.playerSign === 'x') {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }

  };

  return {
    switchPlayer
  }

}());


// Player factory

const Player = function (sign) {

  this.playerSign = sign

  return {
    playerSign
  }

}

const player1 = Player('x');
const player2 = Player('o');
let currentPlayer = player1;