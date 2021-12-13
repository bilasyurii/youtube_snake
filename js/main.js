import RenderUtils from "./render-utils.js";
import Snake from "./snake.js";
import Vector from "./vector.js";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const screenWidth = 600;
const screenHeight = 400;

canvas.width = screenWidth;
canvas.height = screenHeight;

const apples = [];
const walls = [];

let time = 0;
let score = 0;

const spawnApple = () => {
  while (true) {
    const x = ~~(Math.random() * 14 + 1);
    const y = ~~(Math.random() * 9 + 1);
    const apple = new Vector(x, y);
    const part = snake.checkCollision(apple);

    if (part === null) {
      apples.push(apple);
      break;
    }
  }
};

const makeWall = (x, y, width, height) => {
  for (let i = 0; i < width; ++i) {
    const wallX = x + i;

    for (let j = 0; j < height; ++j) {
      const wallY = y + j;
      const wall = new Vector(wallX, wallY);
      walls.push(wall);
    }
  }
};

const createWalls = () => {
  makeWall(0, 0, 16, 1);
  makeWall(0, 10, 16, 1);
  makeWall(0, 1, 1, 9);
  makeWall(15, 1, 1, 9);
};

createWalls();

let snake;

const startGame = () => {
  score = 0;
  time = Date.now();

  const x = ~~(Math.random() * 14 + 1);
  const y = ~~(Math.random() * 5 + 3);
  snake = new Snake(new Vector(x, y));

  apples.splice(0);
  spawnApple();
};

startGame();

window.addEventListener('keydown', (event) => {
  const key = event.code;
  snake.onKeyDown(key);
});

const loseGame = () => {
  alert('Game over');
  startGame();
};

const gameLoop = () => {
  const currentTime = Date.now();
  const dt = (currentTime - time) * 0.001;
  time = currentTime;

  ctx.clearRect(0, 0, screenWidth, screenHeight);

  renderWalls();
  renderApples();

  snake.update(dt);

  const appleEaten = snake.checkApples(apples);

  if (appleEaten !== null) {
    const appleIndex = apples.indexOf(appleEaten);
    apples.splice(appleIndex, 1);
    snake.grow();
    snake.fasten();
    spawnApple();
    ++score;
  }

  const wall = snake.checkWalls(walls);

  if (wall !== null) {
    loseGame();
  } else {
    const part = snake.checkSelfCollision();

    if (part !== null) {
      loseGame();
    }
  }

  snake.render(ctx);

  ctx.font = '32px Arial';
  ctx.fillStyle = 'purple';
  ctx.fillText('Score: ' + score, 8 * 32 - 50, 10 * 32 + 64);

  requestAnimationFrame(gameLoop);
};

requestAnimationFrame(gameLoop);

const renderApples = () => {
  const count = apples.length;

  for (let i = 0; i < count; ++i) {
    const apple = apples[i];
    const x = apple.x;
    const y = apple.y;
    RenderUtils.drawCircle(ctx, x, y, 'red');
  }
};

const renderWalls = () => {
  const count = walls.length;

  for (let i = 0; i < count; ++i) {
    const wall = walls[i];
    const x = wall.x;
    const y = wall.y;
    RenderUtils.drawRectangle(ctx, x, y, 'blue');
  }
};
