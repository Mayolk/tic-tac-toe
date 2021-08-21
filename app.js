const GameBoard = (function() {

  const gameboardArray = ['', '', '', '', '', '', '', '', ''];
  const gameboardUI = document.querySelectorAll('.board-field'); 

  
  const placeSign = function() {

    let pickedField = this.getAttribute('data-board-index');

    if (gameboardArray[pickedField] === '') {
      
      gameboardArray[pickedField] = 'x';
      fillBoard();

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




// GameEngine


// PlayerFactory