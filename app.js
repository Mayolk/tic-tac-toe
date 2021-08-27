// Player factory

const Player = function (sign) {

  this.playerSign = sign

  return {
    playerSign
  }

}

// Game engine

const GameEngine = (function() {

  const player1 = Player('x');
  const player2 = Player('o');

  return {
    player1,
    player2
  }

})();



// Game board

const GameBoard = (function() {

  let currentPlayer = GameEngine.player1;
  const gameData = ['', '', '', '', '', '', '', '', ''];
  const gameboardUI = document.querySelectorAll('.board-field'); 

  // Event handler
  const placeSign = function() {

    let pickedField = this.getAttribute('data-board-index');

    if (gameData[pickedField] === '') {
      
      gameData[pickedField] = currentPlayer.playerSign;
      fillBoard();
      switchPlayer();
      checkResult();
    }

  }

  const switchPlayer = function() {

    if (currentPlayer.playerSign === 'x') {
      currentPlayer = GameEngine.player2;
    } else {
      currentPlayer = GameEngine.player1;
    }

  };

  const fillBoard = function() {

    for (let i = 0; i < gameData.length; i++) {
      gameboardUI[i].textContent = gameData[i];
    }

  };

  const checkResult = function() {
    let combinationsArray = [
      [gameData[0], gameData[1], gameData[2]],
      [gameData[3], gameData[4], gameData[5]],
      [gameData[6], gameData[7], gameData[8]],
      [gameData[0], gameData[3], gameData[6]],
      [gameData[1], gameData[4], gameData[7]],
      [gameData[2], gameData[5], gameData[8]],
      [gameData[0], gameData[4], gameData[8]],
      [gameData[2], gameData[4], gameData[6]]
    ];
    
    combinationsArray.forEach( combo => {
      
      if (combo.every( sign => sign === 'x') || combo.every( sign => sign === 'o')) {
        console.log(`${combo[0]} wins`);
        gameboardUI.forEach( field => { field.removeEventListener('click', placeSign) });
      }

    })
  };

  // Event listeners
  gameboardUI.forEach( field => { field.addEventListener('click', placeSign) });

  return {

  };

})();