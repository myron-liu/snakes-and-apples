import React from 'react';

import StartScreen from './startScreen'
import { Snake, DIRECTIONS, OPPOSITE_DIRECTIONS, GAME_WIDTH, GAME_HEIGHT, TOKEN_TYPE, HAZARD_TYPE } from './game/snake.js'
import SNAKE_HEAD_LEFT from './assets/snake-head-left.png';
import SNAKE_HEAD_RIGHT from './assets/snake-head-right.png';
import SNAKE_HEAD_UP from './assets/snake-head-up.png';
import SNAKE_HEAD_DOWN from './assets/snake-head-down.png';
import SNAKE_HEAD_DEAD_LEFT from './assets/snake-head-dead-left.png';
import SNAKE_HEAD_DEAD_RIGHT from './assets/snake-head-dead-right.png';
import SNAKE_HEAD_DEAD_UP from './assets/snake-head-dead-up.png';
import SNAKE_HEAD_DEAD_DOWN from './assets/snake-head-dead-down.png';
import SNAKE_TAIL_LEFT from './assets/snake-tail-left.png';
import SNAKE_TAIL_RIGHT from './assets/snake-tail-right.png';
import SNAKE_TAIL_UP from './assets/snake-tail-up.png';
import SNAKE_TAIL_DOWN from './assets/snake-tail-down.png';
import SNAKE_BODY_LEFT from './assets/snake-body-left.png';
import SNAKE_BODY_RIGHT from './assets/snake-body-right.png';
import SNAKE_BODY_UP from './assets/snake-body-up.png';
import SNAKE_BODY_DOWN from './assets/snake-body-down.png';
import SNAKE_TURN_DOWN_LEFT from './assets/snake-turn-down-left.png';
import SNAKE_TURN_DOWN_RIGHT from './assets/snake-turn-down-right.png';
import SNAKE_TURN_UP_LEFT from './assets/snake-turn-up-left.png';
import SNAKE_TURN_UP_RIGHT from './assets/snake-turn-up-right.png';
import SNAKE_TURN_RIGHT_UP from './assets/snake-turn-right-up.png';
import SNAKE_TURN_RIGHT_DOWN from './assets/snake-turn-right-down.png';
import SNAKE_TURN_LEFT_UP from './assets/snake-turn-left-up.png';
import SNAKE_TURN_LEFT_DOWN from './assets/snake-turn-left-down.png';
import SNAKE_HEAD_EATING_LEFT from './assets/snake-head-eating-left.png';
import SNAKE_HEAD_EATING_RIGHT from './assets/snake-head-eating-right.png';
import SNAKE_HEAD_EATING_UP from './assets/snake-head-eating-up.png';
import SNAKE_HEAD_EATING_DOWN from './assets/snake-head-eating-down.png';
import SNAKE_HEAD_INVINCIBLE_LEFT from './assets/snake-head-invincible-left.png';
import SNAKE_HEAD_INVINCIBLE_RIGHT from './assets/snake-head-invincible-right.png';
import SNAKE_HEAD_INVINCIBLE_UP from './assets/snake-head-invincible-up.png';
import SNAKE_HEAD_INVINCIBLE_DOWN from './assets/snake-head-invincible-down.png';
import SNAKE_HEAD_INVINCIBLE_EATING_LEFT from './assets/snake-head-invincible-eating-left.png';
import SNAKE_HEAD_INVINCIBLE_EATING_RIGHT from './assets/snake-head-invincible-eating-right.png';
import SNAKE_HEAD_INVINCIBLE_EATING_UP from './assets/snake-head-invincible-eating-up.png';
import SNAKE_HEAD_INVINCIBLE_EATING_DOWN from './assets/snake-head-invincible-eating-down.png';
import SNAKE_TAIL_INVINCIBLE_LEFT from './assets/snake-tail-invincible-left.png';
import SNAKE_TAIL_INVINCIBLE_RIGHT from './assets/snake-tail-invincible-right.png';
import SNAKE_TAIL_INVINCIBLE_UP from './assets/snake-tail-invincible-up.png';
import SNAKE_TAIL_INVINCIBLE_DOWN from './assets/snake-tail-invincible-down.png';
import SNAKE_BODY_INVINCIBLE_LEFT from './assets/snake-body-invincible-left.png';
import SNAKE_BODY_INVINCIBLE_RIGHT from './assets/snake-body-invincible-right.png';
import SNAKE_BODY_INVINCIBLE_UP from './assets/snake-body-invincible-up.png';
import SNAKE_BODY_INVINCIBLE_DOWN from './assets/snake-body-invincible-down.png';

import RED_APPLE from './assets/red-apple.png';
import RED_PIE from './assets/red-pie.png';
import GREEN_APPLE from './assets/green-apple.png';
import GREEN_PIE from './assets/green-pie.png';
import GREEN_SUBSIDY from './assets/green-subsidy.png';
import CARBON_TAX from './assets/carbon-tax.png';
import CARBON_DIVIDEND from './assets/carbon-dividend.png';
import DROUGHT from './assets/drought.png';
import FIRE from './assets/fire.png';
import FLOOD from './assets/flood.png';

import './App.css';

let CANVAS_WIDTH = window.innerWidth * 0.80;
let CANVAS_HEIGHT = window.innerHeight * 0.80;
CANVAS_WIDTH = Math.min(CANVAS_WIDTH, CANVAS_HEIGHT);
CANVAS_HEIGHT = CANVAS_WIDTH;


const SQUARE_LENGTH = CANVAS_WIDTH / GAME_HEIGHT;

const DEFAULT_SNAKE_LENGTH = 8;
const START_X = 9;
const START_Y = 11;

const TOTAL_FRAMES_PER_SQUARE = 7;

const SNAKE_HEAD_IMAGE_LEFT = new Image();
SNAKE_HEAD_IMAGE_LEFT.src = SNAKE_HEAD_LEFT;
const SNAKE_HEAD_IMAGE_RIGHT = new Image();
SNAKE_HEAD_IMAGE_RIGHT.src = SNAKE_HEAD_RIGHT;
const SNAKE_HEAD_IMAGE_UP = new Image();
SNAKE_HEAD_IMAGE_UP.src = SNAKE_HEAD_UP;
const SNAKE_HEAD_IMAGE_DOWN = new Image();
SNAKE_HEAD_IMAGE_DOWN.src = SNAKE_HEAD_DOWN;

const SNAKE_HEAD_IMAGE_DEAD_LEFT = new Image();
SNAKE_HEAD_IMAGE_DEAD_LEFT.src = SNAKE_HEAD_DEAD_LEFT;
const SNAKE_HEAD_IMAGE_DEAD_RIGHT = new Image();
SNAKE_HEAD_IMAGE_DEAD_RIGHT.src = SNAKE_HEAD_DEAD_RIGHT;
const SNAKE_HEAD_IMAGE_DEAD_UP = new Image();
SNAKE_HEAD_IMAGE_DEAD_UP.src = SNAKE_HEAD_DEAD_UP;
const SNAKE_HEAD_IMAGE_DEAD_DOWN = new Image();
SNAKE_HEAD_IMAGE_DEAD_DOWN.src = SNAKE_HEAD_DEAD_DOWN;

const SNAKE_HEAD_IMAGE_INVINCIBLE_LEFT = new Image();
SNAKE_HEAD_IMAGE_INVINCIBLE_LEFT.src = SNAKE_HEAD_INVINCIBLE_LEFT;
const SNAKE_HEAD_IMAGE_INVINCIBLE_RIGHT = new Image();
SNAKE_HEAD_IMAGE_INVINCIBLE_RIGHT.src = SNAKE_HEAD_INVINCIBLE_RIGHT;
const SNAKE_HEAD_IMAGE_INVINCIBLE_UP = new Image();
SNAKE_HEAD_IMAGE_INVINCIBLE_UP.src = SNAKE_HEAD_INVINCIBLE_UP;
const SNAKE_HEAD_IMAGE_INVINCIBLE_DOWN = new Image();
SNAKE_HEAD_IMAGE_INVINCIBLE_DOWN.src = SNAKE_HEAD_INVINCIBLE_DOWN;

const SNAKE_HEAD_IMAGE_EATING_LEFT = new Image();
SNAKE_HEAD_IMAGE_EATING_LEFT.src = SNAKE_HEAD_EATING_LEFT;
const SNAKE_HEAD_IMAGE_EATING_RIGHT = new Image();
SNAKE_HEAD_IMAGE_EATING_RIGHT.src = SNAKE_HEAD_EATING_RIGHT;
const SNAKE_HEAD_IMAGE_EATING_UP = new Image();
SNAKE_HEAD_IMAGE_EATING_UP.src = SNAKE_HEAD_EATING_UP;
const SNAKE_HEAD_IMAGE_EATING_DOWN = new Image();
SNAKE_HEAD_IMAGE_EATING_DOWN.src = SNAKE_HEAD_EATING_DOWN;

const SNAKE_HEAD_IMAGE_INVINCIBLE_EATING_LEFT = new Image();
SNAKE_HEAD_IMAGE_INVINCIBLE_EATING_LEFT.src = SNAKE_HEAD_INVINCIBLE_EATING_LEFT;
const SNAKE_HEAD_IMAGE_INVINCIBLE_EATING_RIGHT = new Image();
SNAKE_HEAD_IMAGE_INVINCIBLE_EATING_RIGHT.src = SNAKE_HEAD_INVINCIBLE_EATING_RIGHT;
const SNAKE_HEAD_IMAGE_INVINCIBLE_EATING_UP = new Image();
SNAKE_HEAD_IMAGE_INVINCIBLE_EATING_UP.src = SNAKE_HEAD_INVINCIBLE_EATING_UP;
const SNAKE_HEAD_IMAGE_INVINCIBLE_EATING_DOWN = new Image();
SNAKE_HEAD_IMAGE_INVINCIBLE_EATING_DOWN.src = SNAKE_HEAD_INVINCIBLE_EATING_DOWN;

const SNAKE_TURN_IMAGE_DOWN_LEFT = new Image();
SNAKE_TURN_IMAGE_DOWN_LEFT.src = SNAKE_TURN_DOWN_LEFT;
const SNAKE_TURN_IMAGE_DOWN_RIGHT = new Image();
SNAKE_TURN_IMAGE_DOWN_RIGHT.src = SNAKE_TURN_DOWN_RIGHT;
const SNAKE_TURN_IMAGE_UP_LEFT = new Image();
SNAKE_TURN_IMAGE_UP_LEFT.src = SNAKE_TURN_UP_LEFT;
const SNAKE_TURN_IMAGE_UP_RIGHT = new Image();
SNAKE_TURN_IMAGE_UP_RIGHT.src = SNAKE_TURN_UP_RIGHT;
const SNAKE_TURN_IMAGE_LEFT_UP = new Image();
SNAKE_TURN_IMAGE_LEFT_UP.src = SNAKE_TURN_LEFT_UP;
const SNAKE_TURN_IMAGE_LEFT_DOWN = new Image();
SNAKE_TURN_IMAGE_LEFT_DOWN.src = SNAKE_TURN_LEFT_DOWN;
const SNAKE_TURN_IMAGE_RIGHT_UP = new Image();
SNAKE_TURN_IMAGE_RIGHT_UP.src = SNAKE_TURN_RIGHT_UP;
const SNAKE_TURN_IMAGE_RIGHT_DOWN = new Image();
SNAKE_TURN_IMAGE_RIGHT_DOWN.src = SNAKE_TURN_RIGHT_DOWN;

const SNAKE_TAIL_IMAGE_LEFT = new Image();
SNAKE_TAIL_IMAGE_LEFT.src = SNAKE_TAIL_LEFT;
const SNAKE_TAIL_IMAGE_RIGHT = new Image();
SNAKE_TAIL_IMAGE_RIGHT.src = SNAKE_TAIL_RIGHT;
const SNAKE_TAIL_IMAGE_UP = new Image();
SNAKE_TAIL_IMAGE_UP.src = SNAKE_TAIL_UP;
const SNAKE_TAIL_IMAGE_DOWN = new Image();
SNAKE_TAIL_IMAGE_DOWN.src = SNAKE_TAIL_DOWN;

const SNAKE_BODY_IMAGE_LEFT = new Image();
SNAKE_BODY_IMAGE_LEFT.src = SNAKE_BODY_LEFT;
const SNAKE_BODY_IMAGE_RIGHT = new Image();
SNAKE_BODY_IMAGE_RIGHT.src = SNAKE_BODY_RIGHT;
const SNAKE_BODY_IMAGE_UP = new Image();
SNAKE_BODY_IMAGE_UP.src = SNAKE_BODY_UP;
const SNAKE_BODY_IMAGE_DOWN = new Image();
SNAKE_BODY_IMAGE_DOWN.src = SNAKE_BODY_DOWN;

const SNAKE_BODY_IMAGE_INVINCIBLE_LEFT = new Image();
SNAKE_BODY_IMAGE_INVINCIBLE_LEFT.src = SNAKE_BODY_INVINCIBLE_LEFT;
const SNAKE_BODY_IMAGE_INVINCIBLE_RIGHT = new Image();
SNAKE_BODY_IMAGE_INVINCIBLE_RIGHT.src = SNAKE_BODY_INVINCIBLE_RIGHT;
const SNAKE_BODY_IMAGE_INVINCIBLE_UP = new Image();
SNAKE_BODY_IMAGE_INVINCIBLE_UP.src = SNAKE_BODY_INVINCIBLE_UP;
const SNAKE_BODY_IMAGE_INVINCIBLE_DOWN = new Image();
SNAKE_BODY_IMAGE_INVINCIBLE_DOWN.src = SNAKE_BODY_INVINCIBLE_DOWN;

const SNAKE_TAIL_IMAGE_INVINCIBLE_LEFT = new Image();
SNAKE_TAIL_IMAGE_INVINCIBLE_LEFT.src = SNAKE_TAIL_INVINCIBLE_LEFT;
const SNAKE_TAIL_IMAGE_INVINCIBLE_RIGHT = new Image();
SNAKE_TAIL_IMAGE_INVINCIBLE_RIGHT.src = SNAKE_TAIL_INVINCIBLE_RIGHT;
const SNAKE_TAIL_IMAGE_INVINCIBLE_UP = new Image();
SNAKE_TAIL_IMAGE_INVINCIBLE_UP.src = SNAKE_TAIL_INVINCIBLE_UP;
const SNAKE_TAIL_IMAGE_INVINCIBLE_DOWN = new Image();
SNAKE_TAIL_IMAGE_INVINCIBLE_DOWN.src = SNAKE_TAIL_INVINCIBLE_DOWN;


const SNAKE_TURNS = {
  [`${DIRECTIONS.DOWN}-${DIRECTIONS.LEFT}`]: SNAKE_TURN_IMAGE_DOWN_LEFT,
  [`${DIRECTIONS.DOWN}-${DIRECTIONS.RIGHT}`]: SNAKE_TURN_IMAGE_DOWN_RIGHT,
  [`${DIRECTIONS.UP}-${DIRECTIONS.LEFT}`]: SNAKE_TURN_IMAGE_UP_LEFT,
  [`${DIRECTIONS.UP}-${DIRECTIONS.RIGHT}`]: SNAKE_TURN_IMAGE_UP_RIGHT,
  [`${DIRECTIONS.LEFT}-${DIRECTIONS.UP}`]: SNAKE_TURN_IMAGE_LEFT_UP,
  [`${DIRECTIONS.LEFT}-${DIRECTIONS.DOWN}`]: SNAKE_TURN_IMAGE_LEFT_DOWN,
  [`${DIRECTIONS.RIGHT}-${DIRECTIONS.UP}`]: SNAKE_TURN_IMAGE_RIGHT_UP,
  [`${DIRECTIONS.RIGHT}-${DIRECTIONS.DOWN}`]: SNAKE_TURN_IMAGE_RIGHT_DOWN,
};

const SNAKE_HEADS = {
  DEAD: {
    [DIRECTIONS.UP]: SNAKE_HEAD_IMAGE_DEAD_UP,
    [DIRECTIONS.DOWN]: SNAKE_HEAD_IMAGE_DEAD_DOWN,
    [DIRECTIONS.LEFT]: SNAKE_HEAD_IMAGE_DEAD_LEFT,
    [DIRECTIONS.RIGHT]: SNAKE_HEAD_IMAGE_DEAD_RIGHT,
  },
  ALIVE: {
    [DIRECTIONS.UP]: SNAKE_HEAD_IMAGE_UP,
    [DIRECTIONS.DOWN]: SNAKE_HEAD_IMAGE_DOWN,
    [DIRECTIONS.LEFT]: SNAKE_HEAD_IMAGE_LEFT,
    [DIRECTIONS.RIGHT]: SNAKE_HEAD_IMAGE_RIGHT,
  },
  INVINCIBLE: {
    [DIRECTIONS.UP]: SNAKE_HEAD_IMAGE_INVINCIBLE_UP,
    [DIRECTIONS.DOWN]: SNAKE_HEAD_IMAGE_INVINCIBLE_DOWN,
    [DIRECTIONS.LEFT]: SNAKE_HEAD_IMAGE_INVINCIBLE_LEFT,
    [DIRECTIONS.RIGHT]: SNAKE_HEAD_IMAGE_INVINCIBLE_RIGHT,
  },
}

const SNAKE_HEADS_EATING = {
  ALIVE: {
    [DIRECTIONS.UP]: SNAKE_HEAD_IMAGE_EATING_UP,
    [DIRECTIONS.DOWN]: SNAKE_HEAD_IMAGE_EATING_DOWN,
    [DIRECTIONS.LEFT]: SNAKE_HEAD_IMAGE_EATING_LEFT,
    [DIRECTIONS.RIGHT]: SNAKE_HEAD_IMAGE_EATING_RIGHT,
  },
  INVINCIBLE: {
    [DIRECTIONS.UP]: SNAKE_HEAD_IMAGE_INVINCIBLE_EATING_UP,
    [DIRECTIONS.DOWN]: SNAKE_HEAD_IMAGE_INVINCIBLE_EATING_DOWN,
    [DIRECTIONS.LEFT]: SNAKE_HEAD_IMAGE_INVINCIBLE_EATING_LEFT,
    [DIRECTIONS.RIGHT]: SNAKE_HEAD_IMAGE_INVINCIBLE_EATING_RIGHT,
  },
}

const SNAKE_TAILS = {
  ALIVE: {
    [DIRECTIONS.UP]: SNAKE_TAIL_IMAGE_UP,
    [DIRECTIONS.DOWN]: SNAKE_TAIL_IMAGE_DOWN,
    [DIRECTIONS.LEFT]: SNAKE_TAIL_IMAGE_LEFT,
    [DIRECTIONS.RIGHT]: SNAKE_TAIL_IMAGE_RIGHT,
  },
  INVINCIBLE: {
    [DIRECTIONS.UP]: SNAKE_TAIL_IMAGE_INVINCIBLE_UP,
    [DIRECTIONS.DOWN]: SNAKE_TAIL_IMAGE_INVINCIBLE_DOWN,
    [DIRECTIONS.LEFT]: SNAKE_TAIL_IMAGE_INVINCIBLE_LEFT,
    [DIRECTIONS.RIGHT]: SNAKE_TAIL_IMAGE_INVINCIBLE_RIGHT,
  },
}

const SNAKE_BODY = {
  ALIVE: {
    [DIRECTIONS.UP]: SNAKE_BODY_IMAGE_UP,
    [DIRECTIONS.DOWN]: SNAKE_BODY_IMAGE_DOWN,
    [DIRECTIONS.LEFT]: SNAKE_BODY_IMAGE_LEFT,
    [DIRECTIONS.RIGHT]: SNAKE_BODY_IMAGE_RIGHT,
  },
  INVINCIBLE: {
    [DIRECTIONS.UP]: SNAKE_BODY_IMAGE_INVINCIBLE_UP,
    [DIRECTIONS.DOWN]: SNAKE_BODY_IMAGE_INVINCIBLE_DOWN,
    [DIRECTIONS.LEFT]: SNAKE_BODY_IMAGE_INVINCIBLE_LEFT,
    [DIRECTIONS.RIGHT]: SNAKE_BODY_IMAGE_INVINCIBLE_RIGHT,
  },
}

const RED_APPLE_IMAGE = new Image();
RED_APPLE_IMAGE.src = RED_APPLE;
const RED_PIE_IMAGE = new Image();
RED_PIE_IMAGE.src = RED_PIE;
const GREEN_APPLE_IMAGE = new Image();
GREEN_APPLE_IMAGE.src = GREEN_APPLE;
const GREEN_PIE_IMAGE = new Image();
GREEN_PIE_IMAGE.src = GREEN_PIE;
const GREEN_SUBSIDY_IMAGE = new Image();
GREEN_SUBSIDY_IMAGE.src = GREEN_SUBSIDY;
const CARBON_TAX_IMAGE = new Image();
CARBON_TAX_IMAGE.src = CARBON_TAX;
const CARBON_DIVIDEND_IMAGE = new Image();
CARBON_DIVIDEND_IMAGE.src = CARBON_DIVIDEND;

const TOKEN_IMAGES = {
  [TOKEN_TYPE.RED_APPLE]: RED_APPLE_IMAGE,
  [TOKEN_TYPE.RED_PIE]: RED_PIE_IMAGE,
  [TOKEN_TYPE.GREEN_APPLE]: GREEN_APPLE_IMAGE,
  [TOKEN_TYPE.GREEN_PIE]: GREEN_PIE_IMAGE,
  [TOKEN_TYPE.GREEN_SUBSIDY]: GREEN_SUBSIDY_IMAGE,
  [TOKEN_TYPE.CARBON_TAX]: CARBON_TAX_IMAGE,
  [TOKEN_TYPE.CARBON_DIVIDEND]: CARBON_DIVIDEND_IMAGE,
};

const DROUGHT_IMAGE = new Image();
DROUGHT_IMAGE.src = DROUGHT;
const FIRE_IMAGE = new Image();
FIRE_IMAGE.src = FIRE;
const FLOOD_IMAGE = new Image();
FLOOD_IMAGE.src = FLOOD;

const HAZARD_IMAGES = {
  [HAZARD_TYPE.DROUGHT]: DROUGHT_IMAGE,
  [HAZARD_TYPE.FIRE]: FIRE_IMAGE,
  [HAZARD_TYPE.FLOOD]: FLOOD_IMAGE,
}

function drawTokens(ctx, tokens) {
  for (let i = 0; i < tokens.length; i++) {
    const { x, y, tokenType } = tokens[i];
    const image = TOKEN_IMAGES[tokenType];
    const xLocation = x * SQUARE_LENGTH;
    const yLocation = y * SQUARE_LENGTH;
    ctx.drawImage(image, xLocation, yLocation, SQUARE_LENGTH, SQUARE_LENGTH);
  }
}

function drawHazards(ctx, hazards) {
  for (let i = 0; i < hazards.length; i++) {
    const { x, y, hazardType } = hazards[i];
    const image = HAZARD_IMAGES[hazardType];
    const xLocation = x * SQUARE_LENGTH;
    const yLocation = y * SQUARE_LENGTH;
    ctx.drawImage(image, xLocation, yLocation, SQUARE_LENGTH, SQUARE_LENGTH);
  }
}

function drawHead(ctx, snake, frameFraction) {
  const head = snake.getHead();
  const snakeState = snake.getState();
  const { x, y, direction } = head;
  const frameIncrement = frameFraction * SQUARE_LENGTH;
  const xLocation = x * SQUARE_LENGTH;
  const yLocation = y * SQUARE_LENGTH;

  const snakeHead = !snake.isEating() || snakeState === "DEAD" ? SNAKE_HEADS[snakeState][direction] : SNAKE_HEADS_EATING[snakeState][direction];
  switch (direction) {
    case DIRECTIONS.UP:
      ctx.drawImage(snakeHead, xLocation, yLocation - frameIncrement, SQUARE_LENGTH, SQUARE_LENGTH);
      break;
    case DIRECTIONS.DOWN:
      ctx.drawImage(snakeHead, xLocation, yLocation + frameIncrement, SQUARE_LENGTH, SQUARE_LENGTH);
      break;
    case DIRECTIONS.LEFT:
      ctx.drawImage(snakeHead, xLocation - frameIncrement, yLocation, SQUARE_LENGTH, SQUARE_LENGTH);
      break;
    case DIRECTIONS.RIGHT:
      ctx.drawImage(snakeHead, xLocation + frameIncrement, yLocation, SQUARE_LENGTH, SQUARE_LENGTH);
      break;
    default:
      break;
  }
}

function drawTail(ctx, snake, frameFraction) {
  const frameIncrement = frameFraction * SQUARE_LENGTH;
  const tail = snake.getTail();
  for (let i = 0; i < tail.length; i++) {
    let { x, y, direction } = tail[i];
    const xLocation = x * SQUARE_LENGTH;
    const yLocation = y * SQUARE_LENGTH;
    if (i === tail.length - 1) {
      const snakeState = snake.getState();
      let snakeTail = SNAKE_TAILS[snakeState][direction];
      if (snake.isFading()) {
        if (snake.moveNumber % 2 === 0) {
          snakeTail = SNAKE_TAILS["INVINCIBLE"][direction];
        }
        else {
          snakeTail = SNAKE_TAILS["ALIVE"][direction];
        }
      }
      switch (direction) {
        case DIRECTIONS.UP:
          ctx.drawImage(snakeTail, xLocation, yLocation - frameIncrement, SQUARE_LENGTH, SQUARE_LENGTH);
          break;
        case DIRECTIONS.DOWN:
          ctx.drawImage(snakeTail, xLocation, yLocation + frameIncrement, SQUARE_LENGTH, SQUARE_LENGTH);
          break;
        case DIRECTIONS.LEFT:
          ctx.drawImage(snakeTail, xLocation - frameIncrement, yLocation, SQUARE_LENGTH, SQUARE_LENGTH);
          break;
        case DIRECTIONS.RIGHT:
          ctx.drawImage(snakeTail, xLocation + frameIncrement, yLocation, SQUARE_LENGTH, SQUARE_LENGTH);
          break;
        default:
          break;
      }
    }
    else {
      const snakeState = snake.getState();
      let snakeBody = SNAKE_BODY[snakeState][direction];
      if (snake.isFading()) {
        if (snake.moveNumber % 2 === 0) {
          snakeBody = SNAKE_BODY["INVINCIBLE"][direction];
        }
        else {
          snakeBody = SNAKE_BODY["ALIVE"][direction];
        }
      }
      switch (direction) {
        case DIRECTIONS.UP:
          ctx.drawImage(snakeBody, xLocation, yLocation - frameIncrement, SQUARE_LENGTH, SQUARE_LENGTH);
          break;
        case DIRECTIONS.DOWN:
          ctx.drawImage(snakeBody, xLocation, yLocation + frameIncrement, SQUARE_LENGTH, SQUARE_LENGTH);
          break;
        case DIRECTIONS.LEFT:
          ctx.drawImage(snakeBody, xLocation - frameIncrement, yLocation, SQUARE_LENGTH, SQUARE_LENGTH);
          break;
        case DIRECTIONS.RIGHT:
          ctx.drawImage(snakeBody, xLocation + frameIncrement, yLocation, SQUARE_LENGTH, SQUARE_LENGTH);
          break;
        default:
          break;
      }
    }
  }
}

function drawProperTail(ctx, tail, head) {
  let prevX = head.x;
  let prevY = head.y;
  for (let i = 0; i < tail.length; i++) {
    let { x, y, direction } = tail[i];
    const xLocation = x * SQUARE_LENGTH;
    const yLocation = y * SQUARE_LENGTH;
    if (x !== prevX) {
      direction = getXDirection(x, prevX);
    }
    else if (y !== prevY) {
      direction = getYDirection(y, prevY);
    }
    if (i === tail.length - 1) {
      switch (direction) {
        case DIRECTIONS.UP:
          ctx.drawImage(SNAKE_TAIL_IMAGE_UP, xLocation, yLocation, SQUARE_LENGTH, SQUARE_LENGTH);
          break;
        case DIRECTIONS.DOWN:
          ctx.drawImage(SNAKE_TAIL_IMAGE_DOWN, xLocation, yLocation, SQUARE_LENGTH, SQUARE_LENGTH);
          break;
        case DIRECTIONS.LEFT:
          ctx.drawImage(SNAKE_TAIL_IMAGE_LEFT, xLocation, yLocation, SQUARE_LENGTH, SQUARE_LENGTH);
          break;
        case DIRECTIONS.RIGHT:
          ctx.drawImage(SNAKE_TAIL_IMAGE_RIGHT, xLocation, yLocation, SQUARE_LENGTH, SQUARE_LENGTH);
          break;
        default:
          break;
      }
    }
    else {
      let nextX = tail[i + 1].x;
      let nextY = tail[i + 1].y;
      const turn = checkTurn(x, prevX, nextX, y, prevY, nextY);
      const snakeTurn = turn !== '';
      prevX = x;
      prevY = y;
      if (snakeTurn) {
        ctx.drawImage(SNAKE_TURNS[turn], xLocation, yLocation, SQUARE_LENGTH, SQUARE_LENGTH);
        continue;
      }
      switch (direction) {
        case DIRECTIONS.UP:
          ctx.drawImage(SNAKE_BODY_IMAGE_UP, xLocation, yLocation, SQUARE_LENGTH, SQUARE_LENGTH);
          break;
        case DIRECTIONS.DOWN:
          ctx.drawImage(SNAKE_BODY_IMAGE_DOWN, xLocation, yLocation, SQUARE_LENGTH, SQUARE_LENGTH);
          break;
        case DIRECTIONS.LEFT:
          ctx.drawImage(SNAKE_BODY_IMAGE_LEFT, xLocation, yLocation, SQUARE_LENGTH, SQUARE_LENGTH);
          break;
        case DIRECTIONS.RIGHT:
          ctx.drawImage(SNAKE_BODY_IMAGE_RIGHT, xLocation, yLocation, SQUARE_LENGTH, SQUARE_LENGTH);
          break;
        default:
          break;
      }
    }
  }
}

function checkTurn(x, prevX, nextX, y, prevY, nextY) {
  const prevXDirection = getXDirection(x, prevX);
  const nextXDirection = getXDirection(nextX, x);
  const prevYDirection = getYDirection(y, prevY);
  const nextYDirection = getYDirection(nextY, y);

  if (prevXDirection !== null && nextYDirection !== null) {
    return `${nextYDirection}-${prevXDirection}`;
  }
  if (prevYDirection !== null && nextXDirection !== null) {
    return `${nextXDirection}-${prevYDirection}`;
  }
  return '';
}

function getXDirection(x, prevX) {
  if ((x - prevX) > 0) {
    return DIRECTIONS.LEFT;
  }
  else if ((x - prevX) < 0) {
    return DIRECTIONS.RIGHT;
  }
  return null;
}

function getYDirection(y, prevY) {
  if ((y - prevY) > 0) {
    return DIRECTIONS.UP;
  }
  else if ((y - prevY) < 0) {
    return DIRECTIONS.DOWN;
  }
  return null;
}


function clearSnake(ctx) {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function checkCollision(snake) {
  const { x, y, direction } = snake.getHead();
  if (snake.getState() === "INVINCIBLE" || snake.getState() === "INVINCIBLE_FADING") {
    return false;
  }
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
  switch (direction) {
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
    default:
      break;
  }
  return snake.contains(newX, newY) || snake.containsHazard(newX, newY);
}


function beginGameLoop(ctx, snake) {
  let frames = 0;
  function gameLoopCallback() {
    if (frames === TOTAL_FRAMES_PER_SQUARE) {
      if (checkCollision(snake)) {
        clearSnake(ctx);
        window.onkeydown = null;
        snake.setStateToDead();
        drawTokens(ctx, snake.getTokens());
        drawHazards(ctx, snake.getHazards());
        drawHead(ctx, snake, 0);
        drawProperTail(ctx, snake.getTail(), snake.getHead());
        return;
      }
      snake.move();
      const background = document.getElementById('background');
      const backgroundCtx = background.getContext('2d');
      if (snake.getCarbonTaxed()) {
        drawBackground(backgroundCtx, '#C6FD77', '#B1EC77');
      }
      else {
        drawBackground(backgroundCtx, '#D9E121', '#FCEE23');
      }
      frames = 0;
    }
    if (!checkCollision(snake)) {
      clearSnake(ctx);
      drawTokens(ctx, snake.getTokens());
      drawHazards(ctx, snake.getHazards());
      drawHead(ctx, snake, frames / TOTAL_FRAMES_PER_SQUARE);
      drawTail(ctx, snake, frames / TOTAL_FRAMES_PER_SQUARE);
    }
    frames += 1;
    window.requestAnimationFrame(gameLoopCallback);
  }
  window.requestAnimationFrame(gameLoopCallback);
}

function onKeyDownFactory(snake) {
  function onKeyDownCallback(e) {
    const LEFT = 37;
    const RIGHT = 39;
    const UP = 38;
    const DOWN = 40;

    e = e || window.event;
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
    const sameDirection = newDirection !== direction;
    const shouldChangeDirection = newDirection !== null && oppositeDirection && sameDirection
    if (shouldChangeDirection) {
      snake.changeDirection(newDirection);
    }
  }
  return onKeyDownCallback;
}

function drawBackground(backgroundCtx, firstColor, secondColor) {
  for (let i = 0; i < GAME_HEIGHT; i++) {
    for (let j = 0; j < GAME_WIDTH; j++) {
      if ((i + j) % 2 === 0) {
        backgroundCtx.fillStyle = firstColor;
      }
      else {
        backgroundCtx.fillStyle = secondColor;
      }
      backgroundCtx.fillRect(j * SQUARE_LENGTH, i * SQUARE_LENGTH, SQUARE_LENGTH, SQUARE_LENGTH);
    }
  }
}



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showingStartScreen: true };
    this.snake = new Snake(START_X, START_Y, DEFAULT_SNAKE_LENGTH, GAME_HEIGHT, GAME_WIDTH);
    this.gameCtx = undefined; // gets set in the componentDidMount() method
  }

  componentDidMount() {
    const game = document.getElementById('game');
    this.gameCtx = game.getContext('2d');

    const { x, y } = game.getBoundingClientRect();

    const background = document.getElementById('background');
    background.style.left = x;
    background.style.top = y;

    const scoreContainer = document.querySelector('.score-container');
    const concentrationContainer = document.querySelector('.concentration-container');

    scoreContainer.style.marginLeft = `${x}px`;
    concentrationContainer.style.marginRight = `${window.innerWidth - x - CANVAS_WIDTH}px`

    const backgroundCtx = background.getContext('2d');
    drawBackground(backgroundCtx, '#D9E121', '#FCEE23');

    window.onkeydown = onKeyDownFactory(this.snake);
    this.snake.generateToken();
  }

  startGame() {
    beginGameLoop(this.gameCtx, this.snake);
    this.setState({ showingStartScreen: false })
  }

  render() {
     return (
      <article className="App">
        <h1 className={'title'}>Snakes and Apples</h1>
        <section className={'subtitle'}>
          <h2 className={'score-container'}>Score: <span id={'score'}>0</span></h2>
          <h2 className={'concentration-container'}>Concentration: <span id={'concentration'}>278</span> ppm</h2>
        </section>
        <canvas id={'background'} className={'background'} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
         <canvas id={'game'} className={'gameboard'} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
         {this.state.showingStartScreen && <StartScreen onPlayClicked={this.startGame.bind(this)} width={CANVAS_WIDTH} height={CANVAS_HEIGHT}></StartScreen>}
      </article>
    );
  }
}

export default App;
