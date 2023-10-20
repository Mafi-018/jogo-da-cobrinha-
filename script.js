const gridSize = 20;
const gridWidth = 300;
const gridHeight = 300;
let snake = [{ x: 2, y: 2 }];
let food = { x: 10, y: 10 };
let direction = 'right';

function updateGameArea() {
  moveSnake();
  if (checkCollision()) {
    clearInterval(gameInterval);
    alert('Game Over!');
  }
  if (checkFood()) {
    snake.unshift({ x: food.x, y: food.y });
    generateFood();
  }
  drawGame();
}

function moveSnake() {
  let newX = snake[0].x;
  let newY = snake[0].y;

  if (direction === 'right') newX++;
  else if (direction === 'left') newX--;
  else if (direction === 'up') newY--;
  else if (direction === 'down') newY++;

  snake.unshift({ x: newX, y: newY });
  snake.pop();
}

function checkCollision() {
  const head = snake[0];

  if (
    head.x < 0 ||
    head.x >= gridWidth / gridSize ||
    head.y < 0 ||
    head.y >= gridHeight / gridSize
  ) {
    return true;
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }

  return false;
}

function checkFood() {
  const head = snake[0];
  return head.x === food.x && head.y === food.y;
}

function generateFood() {
  const maxX = gridWidth / gridSize;
  const maxY = gridHeight / gridSize;

  do {
    food.x = Math.floor(Math.random() * maxX);
    food.y = Math.floor(Math.random() * maxY);
  } while (snake.some((segment) => segment.x === food.x && segment.y === food.y));
}

function drawGame() {
  const gameContainer = document.querySelector('.game-container');
  gameContainer.innerHTML = '';

  snake.forEach((segment) => {
    const snakeSegment = document.createElement('div');
    snakeSegment.className = 'snake';
    snakeSegment.style.left = `${segment.x * gridSize}px`;
    snakeSegment.style.top = `${segment.y * gridSize}px`;
    gameContainer.appendChild(snakeSegment);
  });

  const foodElement = document.createElement('div');
  foodElement.className = 'food';
  foodElement.style.left = `${food.x * gridSize}px`;
  foodElement.style.top = `${food.y * gridSize}px`;
  gameContainer.appendChild(foodElement);
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight' && direction !== 'left') direction = 'right';
  else if (event.key === 'ArrowLeft' && direction !== 'right') direction = 'left';
  else if (event.key === 'ArrowUp' && direction !== 'down') direction = 'up';
  else if (event.key === 'ArrowDown' && direction !== 'up') direction = 'down';
});

generateFood();
const gameInterval = setInterval(updateGameArea, 100);

