import { useEffect } from 'react';

import { Snake, DIRECTIONS, OPPOSITE_DIRECTIONS, TOKEN_TYPE } from './game/snake.js'
import SNAKE_HEAD_IMAGE from './assets/square.png';
import './App.css';

let CANVAS_WIDTH = window.innerWidth * 0.85;
let CANVAS_HEIGHT = window.innerHeight * 0.85;
CANVAS_WIDTH = Math.min(CANVAS_WIDTH, CANVAS_HEIGHT);
CANVAS_HEIGHT = CANVAS_WIDTH;

const GAME_HEIGHT = 20;
const GAME_WIDTH = 20;
const SQUARE_LENGTH = CANVAS_WIDTH / GAME_HEIGHT;

const DEFAULT_SNAKE_LENGTH = 4;
const START_X = 10;
const START_Y = 11;

const TOTAL_FRAMES_PER_SQUARE = 6;

let snakeHead = null;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function generateToken(snake, tokenType) {
  const coordinates = [];
  const snakeCoordinates = snake.getSnake().map((s) => {
    const { x, y } = s;
    return { x, y };
  })
  for (let i = 0; i < GAME_WIDTH; i++) {
    for (let j = 0; j < GAME_HEIGHT; j++) {
      const coordinate = { x : i, y: j };
      if (snake.getGoodTokens().includes(coordinate)) {
        continue;
      }
      if (snake.getNeutralTokens().includes(coordinate)) {
        continue;
      }
      if (snake.getEvilTokens().includes(coordinate)) {
        continue;
      }
      if (!snakeCoordinates.includes(coordinate)) {
        coordinates.push(coordinate);
      }
    }
  }
  shuffleArray(coordinates);
  const { x, y } = coordinates[0];

  switch (tokenType) {
    case TOKEN_TYPE.EVIL:
      snake.addEvilToken(x, y);
      break;
    case TOKEN_TYPE.NEUTRAL:
      snake.addNeutralToken(x, y);
      break;
    case TOKEN_TYPE.GOOD:
      snake.addGoodToken(x, y);
      break;
  }
}

function drawTokens(ctx, tokens, fillStyle) {
  for (let i = 0; i < tokens.length; i++) {
    const { x, y } = tokens[i];
    const xLocation = x * SQUARE_LENGTH;
    const yLocation = y * SQUARE_LENGTH;
    ctx.fillStyle = fillStyle;
    ctx.fillRect(xLocation, yLocation, SQUARE_LENGTH, SQUARE_LENGTH);
  }
}

function drawHead(ctx, head, frameFraction) {
  const { x, y, direction } = head;
  const frameIncrement = frameFraction * SQUARE_LENGTH;
  const xLocation = x * SQUARE_LENGTH;
  const yLocation = y * SQUARE_LENGTH;
  ctx.fillStyle = '#000000';
  switch(direction) {
    case DIRECTIONS.UP:
      ctx.fillRect(xLocation, yLocation - frameIncrement, SQUARE_LENGTH, SQUARE_LENGTH);
      break;
    case DIRECTIONS.DOWN:
      ctx.fillRect(xLocation, yLocation + frameIncrement, SQUARE_LENGTH, SQUARE_LENGTH);
      break;
    case DIRECTIONS.LEFT:
      ctx.fillRect(xLocation - frameIncrement, yLocation, SQUARE_LENGTH, SQUARE_LENGTH);
      break;
    case DIRECTIONS.RIGHT:
      ctx.fillRect(xLocation + frameIncrement, yLocation, SQUARE_LENGTH, SQUARE_LENGTH);
      break;
    default:
      break;
  }
}

function drawTail(ctx, tail, frameFraction) {
  const frameIncrement = frameFraction * SQUARE_LENGTH;
  for (let i = 0; i < tail.length; i++) {
    const { x, y, direction } = tail[i];
    const xLocation = x * SQUARE_LENGTH;
    const yLocation = y * SQUARE_LENGTH;
    ctx.fillStyle = '#000000';
    switch(direction) {
      case DIRECTIONS.UP:
        ctx.fillRect(xLocation, yLocation - frameIncrement, SQUARE_LENGTH, SQUARE_LENGTH);
        break;
      case DIRECTIONS.DOWN:
        ctx.fillRect(xLocation, yLocation + frameIncrement, SQUARE_LENGTH, SQUARE_LENGTH);
        break;
      case DIRECTIONS.LEFT:
        ctx.fillRect(xLocation - frameIncrement, yLocation, SQUARE_LENGTH, SQUARE_LENGTH);
        break;
      case DIRECTIONS.RIGHT:
        ctx.fillRect(xLocation + frameIncrement, yLocation, SQUARE_LENGTH, SQUARE_LENGTH);
        break;
      default:
        break;
    }
  }
}

function clearSnake(ctx) {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function checkCollision(snake) {
  const { x, y, direction } = snake.getHead();
  if (x === GAME_WIDTH - 1 && direction === DIRECTIONS.RIGHT) {
    return true;
  }
  if (x === 0 && direction === DIRECTIONS.LEFT) {
    return true;
  }
  if (y === GAME_HEIGHT - 1 && direction === DIRECTIONS.DOWN) {
    return true;
  }
  if (y === 0 && direction === DIRECTIONS.UP) {
    return true;
  }
  let newX = -1;
  let newY = -1;
  switch(direction) {
    case DIRECTIONS.UP:
      newX = x;
      newY = y - 1;
      break;
    case DIRECTIONS.DOWN:
      newX = x;
      newY = y + 1;
      break;
    case DIRECTIONS.LEFT:
      newX = x - 1;
      newY = y;
      break;
    case DIRECTIONS.RIGHT:
      newX = x + 1;
      newY = y;
      break;
  }
  return snake.contains(newX, newY);
}


function beginGameLoop(ctx, snake) {
  let frames = 0;
  function gameLoopCallback() {
    const evilTokens = snake.getEvilTokens();
    const neutralTokens = snake.getNeutralTokens();
    const goodTokens = snake.getGoodTokens();
    if (evilTokens.length === 0) {
      generateToken(snake, TOKEN_TYPE.EVIL);
    }
    if (neutralTokens.length === 0 && snake.getPoints() > 20) {
      generateToken(snake, TOKEN_TYPE.NEUTRAL);
    }
    if (goodTokens.length === 0 && snake.getPoints() > 80) {
      generateToken(snake, TOKEN_TYPE.GOOD);
    }
    if (frames === TOTAL_FRAMES_PER_SQUARE) {
      if (checkCollision(snake)) {
        drawHead(ctx, snake.getHead(), frames / TOTAL_FRAMES_PER_SQUARE);
        drawTail(ctx, snake.getTail(), frames / TOTAL_FRAMES_PER_SQUARE);
        return;
      }
      snake.move();
      frames = 0;
    }
    if (!checkCollision(snake)) {
      clearSnake(ctx);
      drawTokens(ctx, evilTokens, '#FF0000');
      drawTokens(ctx, neutralTokens, '#0000FF');
      drawTokens(ctx, goodTokens, '#00FF00')
      drawHead(ctx, snake.getHead(), frames / TOTAL_FRAMES_PER_SQUARE);
      drawTail(ctx, snake.getTail(), frames / TOTAL_FRAMES_PER_SQUARE);
    }
    frames += 1;
    window.requestAnimationFrame(gameLoopCallback);
  }
  window.requestAnimationFrame(gameLoopCallback);
}

function onKeyDownFactory(snake) {
  function onKeyDownCallback(e){
    const LEFT = 37;
    const RIGHT = 39;
    const UP = 38;
    const DOWN = 40;

    e =  e ||  window.event;
    const direction = snake.getDirection();
    let newDirection = null;
    switch (e.keyCode) {
      case UP:
        newDirection = DIRECTIONS.UP;
        break;
      case DOWN:
        newDirection = DIRECTIONS.DOWN;
        break;
      case LEFT:
        newDirection = DIRECTIONS.LEFT;
        break;
      case RIGHT:
        newDirection = DIRECTIONS.RIGHT;
        break;
      default:
        break;
    }
    const tailStart = snake.getTailStart()
    const oppositeDirection = newDirection !== OPPOSITE_DIRECTIONS[direction] && newDirection !== OPPOSITE_DIRECTIONS[tailStart.direction];
    const sameDirection = newDirection !==  direction;
    const shouldChangeDirection = newDirection !== null && oppositeDirection && sameDirection 
    if (shouldChangeDirection) {
      snake.changeDirection(newDirection);
    }
  }
  return onKeyDownCallback;
}

function App() {
  
  const snake = new Snake(START_X, START_Y, DEFAULT_SNAKE_LENGTH, GAME_HEIGHT, GAME_WIDTH);
  useEffect(() => {
    const game = document.getElementById('game');
    const gameCtx = game.getContext('2d');
    snakeHead = new Image();
    snakeHead.onload = function() {
      drawTail(gameCtx, snake.getTail(), 0);
      drawHead(gameCtx, snake.getHead(), 0);
    }
    snakeHead.src = SNAKE_HEAD_IMAGE;
    window.onkeydown = onKeyDownFactory(snake);
    beginGameLoop(gameCtx, snake);    
  });

  return (
    <div className="App">
      <header className={'snakes-and-apples-header'}>
        <title>Snakes and Apples</title>
      </header>
      <h1 className={'title'}>Snakes and Apples</h1>
      <h2 className={'score-container'}>Score: <span id={'score'}>0</span></h2>
      <canvas id={'game'} className={'gameboard'} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
    </div>
  );
}

export default App;
