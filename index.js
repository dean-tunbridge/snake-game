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

// -- GAME FUNCTIONS -- //

function gameStart() {}
function nextTick() {}
function clearBoard() {}
function createFood() {}
function drawFood() {}
function moveSnake() {}
function drawSnake() {}
function changeDirection() {}
function checkGameOver() {}
function displayGameOver() {}
function resetGame() {}
