// -- GAME SETUP -- //
// -- variables -- //
const gameBoard = document.querySelector('#gameBoard')
const context = gameBoard.getContext('2d') // sets context to 2d
const scoreText = document.querySelector('#scoreText')
const resetButton = document.querySelector('#resetButton')
const gameWidth = gameBoard.width // attributes assigned inline within canvas in HTML
const gameHeight = gameBoard.height // attributes assigned inline within canvas in HTML
const snakeColor = '#27360d'
const snakeBorder = 'black'
const foodColor = '#27360d'
const unitSize = 25 // in pixels
let running = false //checks if game is running. default is false
let xVelocity = unitSize // x velocity is how far we move n the x axis every single game tick
let yVelocity = 0 // y velocity is how far we move n the y axis every single game tick
let foodX // Will be randomly assigned later.
let foodY // Will be randomly assigned later.
let score = 0

// -- CREATING THE SNAKE -- //
// snake is an array of objects. The snake starts off with 5 body parts.
// the snake will start in the top left corner. All body parts on the Y axis are the same to start.

let snake = [
  { x: unitSize * 4, y: 0 },
  { x: unitSize * 3, y: 0 },
  { x: unitSize * 2, y: 0 },
  { x: unitSize, y: 0 },
  { x: 0, y: 0 },
]

// -- EVENT LISTENERS FOR GAME -- //
// add event listener for key press, that calls the changeDirection function
// add event listener for a click o  the reset button that will invoke the resetGame function
// invoke gameStart
window.addEventListener('keydown', changeDirection)
resetButton.addEventListener('click', resetGame)

gameStart()
createFood()
// -- GAME FUNCTIONS -- //

function gameStart() {}

function nextTick() {}

function clearBoard() {}

function createFood() {
  function randomFood(min, max) {
    const randomNumber =
      Math.round((Math.random() * (max - min) + min) / unitSize) * 25
    // generates random number.
    // divides by unit size which is 25, so the width of 500 / unitSize which is 25 = 25 which now generates a number between 0 - 24.
    // * 25 accurately places the food into the top left of one of the spaces (console.log prints a random number that is always divisible by 25)
    return randomNumber
  }
  foodX = randomFood(0, gameWidth - unitSize) //(min: 0, max: gameWidth - unitSize)
  console.log(foodX)
}

function drawFood() {}

function moveSnake() {}

function drawSnake() {}

function changeDirection() {}

function checkGameOver() {}

function displayGameOver() {}

function resetGame() {}
