const GameBoard = (function() {

  const gameboardArray = ['x', 'x', 'o', 'o', '', 'x', 'x', 'x', 'o'];
  const gameboardUI = document.querySelectorAll('.board-field'); 

  const fillBoard = function() {

    for (let i = 0; i < gameboardArray.length; i++) {
      gameboardUI[i].textContent = gameboardArray[i];
    }
  };

  return {
    fillBoard
  }
}());

GameBoard.fillBoard();