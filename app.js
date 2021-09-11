document.addEventListener('DOMContentLoaded', () => {
  const gameBoard = document.querySelector('.game-board');
  const scoreField = document.querySelector('.score');
  const width = 3;
  let N = 2;
  let squares = [];
  let positions = [];

  let globalPosition = 0; // указывает позицию массива на котором в данный момент находится активная клеточка

  let score = 0;
  let times = 0; // счетчик отслеживания нажатия (проверка совершается только если нажата клавиша один раз)

  function createGameBoard() {
    for (let i = 0; i < width*width; i++) {
      square = document.createElement('div');
      
      gameBoard.appendChild(square);
      squares.push(square);
    }
  }

  function generatePostion() {
    for(let i = 0; i < 30; i++) {
      let pos = Math.floor(Math.random() * squares.length);
      positions.push(pos);
    }
  }

  createGameBoard();
  generatePostion();

  function displaySquare(position) {
    squares[position].classList.add('displayed-square');
  }

  function removeSquare(position) {
    squares[position].classList.remove('displayed-square')
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function keyPressing(i) {
    document.addEventListener('keyup', control);
  }

  function control(e) {
    if (times < 1) {
      if (e.keyCode === 39) {
        if (globalPosition + 1 > N) {
          if (positions[globalPosition] === positions[globalPosition - N]) {
            score++; 
            scoreField.innerHTML = score;
          }
        }

        times++;
      }
    }
  }

  async function displaying() {
    for(i = 0; i < positions.length; i++) {
      displaySquare(positions[i]);
      globalPosition = i;
      keyPressing(i);
      
      await sleep(3000);

      times = 0;
      document.removeEventListener('keyup', control)
      removeSquare(positions[i])
      
      await sleep(1000);
    }
  }

  displaying();
})