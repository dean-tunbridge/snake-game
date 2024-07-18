// -- GAME SETUP -- //
// -- variables -- //

const gameBoard = document.querySelector('#gameBoard')
const context = gameBoard.getContext('2d') // sets context to 2d
const scoreText = document.querySelector('#scoreText')
const resetButton = document.querySelector('#resetButton')
const gameWidth = gameBoard.width // attributes assigned inline within canvas in HTML
const gameHeight = gameBoard.height // attributes assigned inline within canvas in HTML
let boardBackground = '#8bc400'
const snakeColor = '#27360d'
const snakeBorder = '#8bc400'
const foodColor = '#27360d'
const unitSize = 25 // in pixels
let running = false //checks if game is running. default is false
let xVelocity = unitSize // x velocity is how far we move n the x axis every single game tick
let yVelocity = 0 // y velocity is how far we move n the y axis every single game tick
let foodX // Will be randomly assigned later.
let foodY // Will be randomly assigned later.
let score = 0
let snakeSpeed = 100
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

// start game //
gameStart()

// -- GAME FUNCTIONS -- //

function gameStart() {
  running = true // sets the game running variable to true
  scoreText.textContent = score // sets score to whatever the current score is. starts on 0
  createFood() // invokes createFood function
  drawFood() // invokes drawFood function
  nextTick() // invoke nextTick function, which is what we will do every round, every time we update
}

// next tick function will check inf game is running. If iot is, it will set a timeout, then call the functions below.
// It is current set to run every 100ms

function nextTick() {
  if (running) {
    setTimeout(() => {
      clearBoard()
      drawFood()
      moveSnake()
      drawSnake()
      checkGameOver()
      nextTick()
    }, snakeSpeed)
  } else {
    displayGameOver()
  }
}

function clearBoard() {
  context.fillStyle = boardBackground
  context.fillRect(0, 0, gameWidth, gameHeight) // puts snake back into top left of screen
}

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
  foodY = randomFood(0, gameWidth - unitSize) //(min: 0, max: gameWidth - unitSize)
}

function drawFood() {
  context.fillStyle = foodColor // sets equal to foodColor variable
  context.fillRect(foodX, foodY, unitSize, unitSize) // fill rectangle (foodX, foodY, width, height)
}

// set head of snake to be location of the 0 index of the snake (the head) at x axis + xVelocity
// then the same for the y axis
// add new head to snake using unshift method
// if else statement to remove tail
// use pop method to remove tail
// CHECK IF FOOD WAS EATEN //
// if the x index 0 of the snake (the head) is equal to foodX,
// and the y index 0 of the snake (the head) is equal to foodY,
// that means the snake has eaten.
function moveSnake() {
  const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity }

  snake.unshift(head) // adds one index at head in the direction the snake is traveling
  if (snake[0].x == foodX && snake[0].y == foodY) {
    snakeSpeed -= 2 // increases snake speed by 2ms
    score += 1 // adds 1 to score
    scoreText.textContent = score // updates the score text to the current score
    createFood() // creates a new food as the previous one has just been eaten
  } else {
    snake.pop() // removes last index at tail
  }
}

function drawSnake() {
  context.fillStyle = snakeColor
  context.strokeStyle = snakeBorder
  snake.forEach((snakePart) => {
    context.fillRect(snakePart.x, snakePart.y, unitSize, unitSize) // each snake part has an x and y coordinate. This begins to fill it out. Width and height are set to unitSize
    context.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize) // fills border in
  })
}

function changeDirection(event) {
  const keyPressed = event.keyCode
  // save key press codes (number) //

  const UP = 38
  const DOWN = 40
  const LEFT = 37
  const RIGHT = 39

  // determine which way the snake is going
  const goingUp = yVelocity == -unitSize // is the y velocity of the snake equal to negative unitSize (-25) going up is negative
  const goingDown = yVelocity == unitSize // is the y velocity of the snake equal to positive unitSize (25) going down is positive
  const goingRight = xVelocity == unitSize // is the x velocity of the snake equal to positive unitSize (25) going right is positive
  const goingLeft = xVelocity == -unitSize // is the x velocity of the snake equal to negative unitSize (-25) going left is negative

  // KEY PRESS EVENTS //
  switch (
    true // check if above boolean values are true
  ) {
    case keyPressed == UP && !goingDown: // makes sure you cant turn directly back on yourself as when the snake touches another part of the snake, it is game over
      xVelocity = 0 // going up means you are no longer going left or right
      yVelocity = -unitSize // as we are going up, we want to set the yVelocity to -25 to go up
      break

    case keyPressed == DOWN && !goingUp: // makes sure you cant turn directly back on yourself as when the snake touches another part of the snake, it is game over
      xVelocity = 0 // going down means you are no longer going left or right
      yVelocity = unitSize // as we are going down, we want to set the yVelocity to 25 to go down
      break

    case keyPressed == LEFT && !goingRight: // makes sure you cant turn directly back on yourself as when the snake touches another part of the snake, it is game over
      xVelocity = -unitSize // as we are going left, we want to set the xVelocity to -25 to go left
      yVelocity = 0 // going left means you are no longer going up or down
      break

    case keyPressed == RIGHT && !goingLeft: // makes sure you cant turn directly back on yourself as when the snake touches another part of the snake, it is game over
      xVelocity = unitSize // as we are going right, we want to set the xVelocity to 25 to go right
      yVelocity = 0 // going right means you are no longer going up or down
      break
  }
}

// GAME OVER //
// there are two main ways to lose a game of snake.
// firstly it is by crossing the border of the game, or bumping into the edge of the map essentially
// the second is bumping into another segment of the snake

function checkGameOver() {
  switch (true) {
    case snake[0].x < 0: //this means we went over the left border
      running = false
      break
    case snake[0].x >= gameWidth: //this means we went over the right border
      running = false
      break
    case snake[0].y < 0: //this means we went over the top border
      running = false
      break
    case snake[0].y >= gameHeight: //this means we went over the bottom border
      running = false
      break
  }
  for (let i = 1; i < snake.length; i += 1) {
    // for loop starts i at 1 so it means any snake part that isn't the head [0]
    // if the coordinates of the snake head (snake[0]) are equal to the coordinates of any other part of the snake (snake[i]) it means the game is over
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) running = false
  }
}

function displayGameOver() {
  context.font = "60px 'Silkscreen'"
  context.fillStyle = '#27360d'
  context.textAlign = 'center'
  context.fillText('GAME OVER!', gameWidth / 2, gameHeight / 2) // display game over text in centre of screen

  // DARK SOULS LIKE GAME OVER SCREEN //
  //context.font = "70px 'EB Garamond'"
  //context.fillStyle = 'red'
  //context.fillText('YOU DIED', gameWidth / 2, gameHeight / 2) // display game over text in centre of screen

  running = false
}

function resetGame() {
  score = 0
  xVelocity = unitSize
  yVelocity = 0
  // recreate the snake
  snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 },
  ]

  // invoke the gameStart function again
  gameStart()
}
