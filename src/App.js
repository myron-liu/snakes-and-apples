import React from 'react';
import { Howl, Howler } from "howler"

import './App.css';

import StartScreen from './startScreen'
import GameOverScreen from './gameOverScreen'
import { Snake, SNAKE_STATES, DIRECTIONS, OPPOSITE_DIRECTIONS, GAME_WIDTH, GAME_HEIGHT, TOKEN_TYPE, HAZARD_TYPE } from './game/snake.js'
import { ppmVisualizer } from './particles';

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

import MUTE_ICON from './assets/mute_icon.svg';
import UNMUTE_ICON from './assets/unmute_icon.svg';

import SOUNDTRACK from './assets/sounds/soundtrack.wav';
import CARBON_DIVIDEND_BACKGROUND_SOUND from './assets/sounds/carbon_dividend_background_sound.wav';
import CARBON_TAX_BACKGROUND_SOUND from './assets/sounds/carbon_tax_background_sound.mp3';

import RED_APPLE_CRUNCH_SOUND from './assets/sounds/red_apple_crunch_sound.mp3';
import RED_PIE_SOUND from './assets/sounds/green_pie_sound.mp3';
import GREEN_APPLE_CRUCH_SOUND from './assets/sounds/green_apple_crunch_sound.mp3';
import GREEN_PIE_SOUND from './assets/sounds/green_pie_sound.mp3';
import GREEN_SUBSIDY_SOUND from './assets/sounds/green_subsidy_sound.mp3';
import CARBON_TAX_SOUND from './assets/sounds/carbon_tax_sound.wav';
import CARBON_DIVIDEND_SOUND from './assets/sounds/carbon_dividend_sound.mp3';
import SNAKE_BUMP_SOUND from './assets/sounds/snake_bump_sound.wav';
import WALL_BUMP_SOUND from './assets/sounds/wall_bump_sound.wav';
import COLLISON_NEAR_MISS_SOUND from './assets/sounds/collision_near_miss_sound.wav'

const MIN_DELAY_BETWEEN_SOUND_EFFECTS = 350 // (ms)
const AUDIO_FADE_TIME = 1000 // ms
const AUDIO_SLOWING_RATE = 0.002; // rate change per frame when the carbon dividend effect is ending
let AUDIO_CLIPS = {
  'SOUNDTRACK': new Howl({
    src: [SOUNDTRACK],
    loop: true,
  }),
  'CARBON_TAX_BACKGROUND_SOUND': new Howl({
    src: [CARBON_TAX_BACKGROUND_SOUND],
    loop: true,
  }),
  'CARBON_DIVIDEND_BACKGROUND_SOUND': new Howl({
    src: [CARBON_DIVIDEND_BACKGROUND_SOUND],
    loop: true,
  }),
  'SNAKE_BUMP_SOUND': new Howl({
    src: [SNAKE_BUMP_SOUND],
  }),
  'WALL_BUMP_SOUND': new Howl({
    src: [WALL_BUMP_SOUND],
  }),
  'RED_APPLE_CRUNCH_SOUND': new Howl({
    src: [RED_APPLE_CRUNCH_SOUND],
  }),
  'RED_PIE_SOUND': new Howl({
    src: [RED_PIE_SOUND],
  }),
  'GREEN_APPLE_CRUNCH_SOUND': new Howl({
    src: [GREEN_APPLE_CRUCH_SOUND],
  }),
  'GREEN_PIE_SOUND': new Howl({
    src: [GREEN_PIE_SOUND],
  }),
  'CARBON_TAX_SOUND': new Howl({
    src: [CARBON_TAX_SOUND],
  }),
  'CARBON_DIVIDEND_SOUND': new Howl({
    src: [CARBON_DIVIDEND_SOUND],
  }),
  'GREEN_SUBSIDY_SOUND': new Howl({
    src: [GREEN_SUBSIDY_SOUND],
  }),
  'COLLISON_NEAR_MISS_SOUND': new Howl({
    src: [COLLISON_NEAR_MISS_SOUND],
  }),
}

let canvasWidth = window.innerWidth * 0.80;
let canvasHeight = window.innerHeight * 0.80;
canvasWidth = Math.min(canvasWidth, canvasHeight);
canvasHeight = canvasWidth;

let squareLength = canvasWidth / GAME_HEIGHT;

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
    const xLocation = x * squareLength;
    const yLocation = y * squareLength;
    ctx.drawImage(image, xLocation, yLocation, squareLength, squareLength);
  }
}

function drawHead(ctx, snake, frameFraction) {
  const head = snake.getHead();
  const snakeState = snake.getState();
  const { x, y, direction } = head;
  const frameIncrement = frameFraction * squareLength;
  const xLocation = x * squareLength;
  const yLocation = y * squareLength;

  const snakeHead = !snake.isEating() || snakeState === "DEAD" ? SNAKE_HEADS[snakeState][direction] : SNAKE_HEADS_EATING[snakeState][direction];
  switch (direction) {
    case DIRECTIONS.UP:
      ctx.drawImage(snakeHead, xLocation, yLocation - frameIncrement, squareLength, squareLength);
      break;
    case DIRECTIONS.DOWN:
      ctx.drawImage(snakeHead, xLocation, yLocation + frameIncrement, squareLength, squareLength);
      break;
    case DIRECTIONS.LEFT:
      ctx.drawImage(snakeHead, xLocation - frameIncrement, yLocation, squareLength, squareLength);
      break;
    case DIRECTIONS.RIGHT:
      ctx.drawImage(snakeHead, xLocation + frameIncrement, yLocation, squareLength, squareLength);
      break;
    default:
      break;
  }
}

function drawTail(ctx, snake, frameFraction) {
  const frameIncrement = frameFraction * squareLength;
  const tail = snake.getTail();
  for (let i = 0; i < tail.length; i++) {
    let { x, y, direction } = tail[i];
    const xLocation = x * squareLength;
    const yLocation = y * squareLength;
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
          ctx.drawImage(snakeTail, xLocation, yLocation - frameIncrement, squareLength, squareLength);
          break;
        case DIRECTIONS.DOWN:
          ctx.drawImage(snakeTail, xLocation, yLocation + frameIncrement, squareLength, squareLength);
          break;
        case DIRECTIONS.LEFT:
          ctx.drawImage(snakeTail, xLocation - frameIncrement, yLocation, squareLength, squareLength);
          break;
        case DIRECTIONS.RIGHT:
          ctx.drawImage(snakeTail, xLocation + frameIncrement, yLocation, squareLength, squareLength);
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
          ctx.drawImage(snakeBody, xLocation, yLocation - frameIncrement, squareLength, squareLength);
          break;
        case DIRECTIONS.DOWN:
          ctx.drawImage(snakeBody, xLocation, yLocation + frameIncrement, squareLength, squareLength);
          break;
        case DIRECTIONS.LEFT:
          ctx.drawImage(snakeBody, xLocation - frameIncrement, yLocation, squareLength, squareLength);
          break;
        case DIRECTIONS.RIGHT:
          ctx.drawImage(snakeBody, xLocation + frameIncrement, yLocation, squareLength, squareLength);
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
    const xLocation = x * squareLength;
    const yLocation = y * squareLength;
    if (x !== prevX) {
      direction = getXDirection(x, prevX);
    }
    else if (y !== prevY) {
      direction = getYDirection(y, prevY);
    }
    if (i === tail.length - 1) {
      switch (direction) {
        case DIRECTIONS.UP:
          ctx.drawImage(SNAKE_TAIL_IMAGE_UP, xLocation, yLocation, squareLength, squareLength);
          break;
        case DIRECTIONS.DOWN:
          ctx.drawImage(SNAKE_TAIL_IMAGE_DOWN, xLocation, yLocation, squareLength, squareLength);
          break;
        case DIRECTIONS.LEFT:
          ctx.drawImage(SNAKE_TAIL_IMAGE_LEFT, xLocation, yLocation, squareLength, squareLength);
          break;
        case DIRECTIONS.RIGHT:
          ctx.drawImage(SNAKE_TAIL_IMAGE_RIGHT, xLocation, yLocation, squareLength, squareLength);
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
        ctx.drawImage(SNAKE_TURNS[turn], xLocation, yLocation, squareLength, squareLength);
        continue;
      }
      switch (direction) {
        case DIRECTIONS.UP:
          ctx.drawImage(SNAKE_BODY_IMAGE_UP, xLocation, yLocation, squareLength, squareLength);
          break;
        case DIRECTIONS.DOWN:
          ctx.drawImage(SNAKE_BODY_IMAGE_DOWN, xLocation, yLocation, squareLength, squareLength);
          break;
        case DIRECTIONS.LEFT:
          ctx.drawImage(SNAKE_BODY_IMAGE_LEFT, xLocation, yLocation, squareLength, squareLength);
          break;
        case DIRECTIONS.RIGHT:
          ctx.drawImage(SNAKE_BODY_IMAGE_RIGHT, xLocation, yLocation, squareLength, squareLength);
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
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

/**
 * Checks if the snake will hit an object or wall (meaning the snake head would be on top of the obstacle's square next frame).
 * @param {Snanke} snake - the current instance of the snake class.
 * @returns null if no colision is detected or a string with the type of colision (like "HAZARD_COLLISION") if one is detected
 */
function checkCollision(snake) {
  const { x, y, direction } = snake.getHead();
  if (snake.getState() === "INVINCIBLE" || snake.getState() === "INVINCIBLE_FADING") {
    return null;
  }
  if (x === GAME_WIDTH - 1 && direction === DIRECTIONS.RIGHT) {
    return "WALL_COLLISION";
  }
  if (x === 0 && direction === DIRECTIONS.LEFT) {
    return "WALL_COLLISION";
  }
  if (y === GAME_HEIGHT - 1 && direction === DIRECTIONS.DOWN) {
    return "WALL_COLLISION";
  }
  if (y === 0 && direction === DIRECTIONS.UP) {
    return "WALL_COLLISION";
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
  if (snake.contains(newX, newY)) {
    return "SNAKE_SELF_COLLISION";
  } else if (snake.containsHazard(newX, newY)) {
    return "HAZARD_COLLISION";
  }
  return null;
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

function drawCheckerboard(backgroundCtx, firstColor, secondColor) {
  for (let i = 0; i < GAME_HEIGHT; i++) {
    for (let j = 0; j < GAME_WIDTH; j++) {
      if ((i + j) % 2 === 0) {
        backgroundCtx.fillStyle = firstColor;
      }
      else {
        backgroundCtx.fillStyle = secondColor;
      }
      backgroundCtx.fillRect(j * squareLength, i * squareLength, squareLength, squareLength);
    }
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingStartScreen: true,
      showingGameOverScreen: false,
      countDownDigit: 0,
      muted: false,
    };
    this.snake = new Snake(START_X, START_Y, DEFAULT_SNAKE_LENGTH, GAME_HEIGHT, GAME_WIDTH);
    this.gameCtx = null; // gets set in the componentDidMount() method
    this.lastSoundEffectStartTime = 0; // records the last time a sound effect was played in unix epoch time [ms] (to avoid playing sound effects too frequently)
    this.fireHazardCount = 0; // counts how many fire hazards are shown.
  }

  componentDidMount() {
    const game = document.getElementById('game');
    this.gameCtx = game.getContext('2d');
    this.particlesViz = new ppmVisualizer('particles-viz')

    // handle window resize events (and call the handler right away too so everything is sized right from the start)
    window.onresize = () => { this.onWindowResize() }
    this.onWindowResize();
  }

  onWindowResize() {
    canvasWidth = canvasHeight = Math.floor(Math.min(window.innerWidth, window.innerHeight) * 0.80);
    squareLength = canvasHeight / GAME_HEIGHT;

    const game = document.getElementById('game');
    const background = document.getElementById('background');
    const gameContainer = document.getElementById('game-container');
    game.width = background.width = canvasWidth;
    game.height = background.height = canvasHeight;
    gameContainer.style.width = canvasWidth + "px";
    gameContainer.style.height = canvasHeight + "px"

    this.particlesViz.resizeCanvas(canvasWidth, canvasHeight)

    const gameLayoutContainer = document.getElementById('game-layout-container');
    gameLayoutContainer.style.width = `${canvasWidth}px`;

    this.drawBackground();
    if (this.state.showingStartScreen === false) this.drawSnakeAndItems(0);
  }

  drawHazards() {
    let hazards = this.snake.getHazards();
    let fireCount = 0;
    let newFireX = 0;
    let newFireY = 0;
    for (let i = 0; i < hazards.length; i++) {
      const { x, y, hazardType } = hazards[i];
      const image = HAZARD_IMAGES[hazardType];
      const xLocation = x * squareLength;
      const yLocation = y * squareLength;
      this.gameCtx.drawImage(image, xLocation, yLocation, squareLength, squareLength);

      if (hazardType === HAZARD_TYPE.FIRE) {
        fireCount++;
        newFireX = xLocation + squareLength / 2;
        newFireY = yLocation + squareLength / 2;
      }
    }
    if (this.fireHazardCount !== fireCount) {
      this.fireHazardCount = fireCount;
      this.particlesViz.setEnabled(true);
      this.particlesViz.setParticleCount(Math.min(fireCount * 200, 600))
      this.particlesViz.explodeFromPoint(newFireX, newFireY);
    }
  }

  /**
   * Draws the background checkerboard to the background canvas with a color scheme based on the game state.
   */
  drawBackground() {
    const background = document.getElementById('background');
    const backgroundCtx = background.getContext('2d');
    if (this.snake.getCarbonTaxed()) {
      drawCheckerboard(backgroundCtx, '#C6FD77', '#B1EC77');
    } else {
      drawCheckerboard(backgroundCtx, '#D9E121', '#FCEE23');
    }
  }

  /**
   * Draws the snake and items (hazards + tokens)
   * @param frameNum - the frame number of snake movement within the current square, pass 0 if the snake is still to draw the proper tail.
   */
  drawSnakeAndItems(frameNum) {
    clearSnake(this.gameCtx);
    drawTokens(this.gameCtx, this.snake.getTokens());
    this.drawHazards();
    drawHead(this.gameCtx, this.snake, frameNum);
    if (frameNum === 0) {
      drawProperTail(this.gameCtx, this.snake.getTail(), this.snake.getHead());
    } else {
      drawTail(this.gameCtx, this.snake, frameNum)
    }
  }

  resetGameBoard() {
    for (let clip in AUDIO_CLIPS) {
      if (clip === "SOUNDTRACK" && !AUDIO_CLIPS['SOUNDTRACK'].playing()) {
        // keep the soundtrack playing, or start it if it isn't playing:
        AUDIO_CLIPS['SOUNDTRACK'].play();
      } else {
        // stop all the other sounds:
        AUDIO_CLIPS[clip].stop()
      }
    }
    this.snake.generateToken();
    this.drawBackground();
    this.drawSnakeAndItems(0);
    this.particlesViz.setEnabled(false);
  }

  startGame() {
    window.onkeydown = onKeyDownFactory(this.snake);
    this.beginGameLoop();
    this.setState({ showingStartScreen: false, showingGameOverScreen: false })
  }

  startCountdown() {
    this.setState({
      countDownDigit: 3,
      showingStartScreen: false,
      showingGameOverScreen: false
    })

    let intervalId = setInterval(() => {
      if (this.state.countDownDigit > 0) {
        this.setState({ countDownDigit: this.state.countDownDigit - 1 })
      }
      if (this.state.countDownDigit === 0) {
        clearInterval(intervalId)
        this.startGame();
      }
    }, 700)

    // for whatever reason it seems to need a timeout before rendering the new game board, otherwise everything is white.
    setTimeout(() => {
      this.resetGameBoard();
    }, 3)
  }

  gameOver() {
    this.snake.setStateToDead();
    this.drawSnakeAndItems(0)
    this.setState({ showingGameOverScreen: true })
    window.onkeydown = null;
    window.onkeydown = () => {
      window.onkeydown = null;
      this.snake = new Snake(START_X, START_Y, DEFAULT_SNAKE_LENGTH, GAME_HEIGHT, GAME_WIDTH);
      this.snake.points = 0;
      const scoreElem = document.getElementById('score');
      if (scoreElem) {
        scoreElem.innerHTML = this.snake.points;
      }
      this.fireHazardCount = 0;
      this.resetGameBoard()
      this.startCountdown()
    };
    AUDIO_CLIPS['CARBON_DIVIDEND_BACKGROUND_SOUND'].stop()
    AUDIO_CLIPS['CARBON_TAX_BACKGROUND_SOUND'].stop()
  }

  /**
   * handles fading in/out the background music for each of the game states:
   * CARBON_DIVIDEND_BACKGROUND_SOUND is when the snake eats the parachute icon & becomes invincible
   * CARBON_TAX_BACKGROUND_SOUND is when the snake eats the tax icon & the board goes green.
   */
  handleBackgroundSounds() {
    // handle fading in/out the main soundtrack
    let soundtrackVolume = AUDIO_CLIPS["SOUNDTRACK"].volume()
    if (this.snake.getCarbonTaxed()) {
      if (soundtrackVolume === 1) {
        AUDIO_CLIPS['SOUNDTRACK'].fade(1, 0.4, AUDIO_FADE_TIME);
      }
    } else if (this.snake.getState() === SNAKE_STATES.INVINCIBLE) {
      if (soundtrackVolume === 1) {
        AUDIO_CLIPS['SOUNDTRACK'].fade(1, 0, AUDIO_FADE_TIME);
      }
    } else {
      if (soundtrackVolume === 0 || soundtrackVolume === 0.4) {
        AUDIO_CLIPS['SOUNDTRACK'].fade(soundtrackVolume, 1, AUDIO_FADE_TIME);
      }
    }

    // handle playing/stopping the carbon dividend soundtrack
    const isInvincible = this.snake.getState() === SNAKE_STATES.INVINCIBLE
    const dividendSoundIsPlaying = AUDIO_CLIPS['CARBON_DIVIDEND_BACKGROUND_SOUND'].playing()
    const dividendSoundVolume = AUDIO_CLIPS['CARBON_DIVIDEND_BACKGROUND_SOUND'].volume()
    const dividendSoundRate = AUDIO_CLIPS['CARBON_DIVIDEND_BACKGROUND_SOUND'].rate()
    if (isInvincible && !dividendSoundIsPlaying) {
      AUDIO_CLIPS['CARBON_DIVIDEND_BACKGROUND_SOUND'].volume(1)
      AUDIO_CLIPS['CARBON_DIVIDEND_BACKGROUND_SOUND'].rate(1)
      AUDIO_CLIPS['CARBON_DIVIDEND_BACKGROUND_SOUND'].play();
    } else if (isInvincible && this.snake.isFading()) {
      AUDIO_CLIPS['CARBON_DIVIDEND_BACKGROUND_SOUND'].rate(dividendSoundRate - AUDIO_SLOWING_RATE);
    } else if (!isInvincible && dividendSoundIsPlaying && dividendSoundVolume === 1) {
      AUDIO_CLIPS['CARBON_DIVIDEND_BACKGROUND_SOUND'].fade(1, 0, AUDIO_FADE_TIME);
      setTimeout(() => {
        if (!isInvincible && dividendSoundIsPlaying) AUDIO_CLIPS['CARBON_DIVIDEND_BACKGROUND_SOUND'].stop();
      }, AUDIO_FADE_TIME)
    }

    // handle playing/stopping the carbon tax "nature" soundtrack
    const taxSoundPlaying = AUDIO_CLIPS['CARBON_TAX_BACKGROUND_SOUND'].playing()
    const taxSoundVolume = AUDIO_CLIPS['CARBON_TAX_BACKGROUND_SOUND'].volume()
    if (this.snake.getCarbonTaxed() && !taxSoundPlaying) {
      AUDIO_CLIPS['CARBON_TAX_BACKGROUND_SOUND'].volume(1)
      AUDIO_CLIPS['CARBON_TAX_BACKGROUND_SOUND'].play();
    } else if (!this.snake.getCarbonTaxed() && taxSoundPlaying && taxSoundVolume === 1) {
      AUDIO_CLIPS['CARBON_TAX_BACKGROUND_SOUND'].fade(1, 0, AUDIO_FADE_TIME);
      setTimeout(() => {
        if (!this.snake.getCarbonTaxed() && taxSoundPlaying) AUDIO_CLIPS['CARBON_TAX_BACKGROUND_SOUND'].stop();
      }, AUDIO_FADE_TIME)
    }
  }

  /**
   * Play the given sound.
   * @param {String} soundName the name of the sound to play from the AUDIO_CLIPS object
   * @param {Boolean} force override the MIN_DELAY_BETWEEN_SOUND_EFFECTS check and always play the sound (as long as it isn't already playing).
   * @returns
   */
  playSoundEffect(soundName, force) {
    let timeNow = new Date().getTime()
    if (timeNow - this.lastSoundEffectStartTime < MIN_DELAY_BETWEEN_SOUND_EFFECTS && force !== true) { return };
    if (AUDIO_CLIPS[soundName].playing()) { return };
    AUDIO_CLIPS[soundName].play()
    this.lastSoundEffectStartTime = timeNow;
  }

  playTokenSound(tokenType) {
    switch (tokenType) {
      case TOKEN_TYPE.RED_APPLE:
        this.playSoundEffect('RED_APPLE_CRUNCH_SOUND');
        break;
      case TOKEN_TYPE.GREEN_APPLE:
        this.playSoundEffect('GREEN_APPLE_CRUNCH_SOUND');
        break;
      case TOKEN_TYPE.RED_PIE:
        this.playSoundEffect('RED_PIE_SOUND');
        break;
      case TOKEN_TYPE.GREEN_PIE:
        this.playSoundEffect('GREEN_PIE_SOUND');
        break;
      case TOKEN_TYPE.GREEN_SUBSIDY:
        this.playSoundEffect('GREEN_SUBSIDY_SOUND');
        break;
      case TOKEN_TYPE.CARBON_TAX:
        this.playSoundEffect('CARBON_TAX_SOUND');
        break;
      case TOKEN_TYPE.CARBON_DIVIDEND:
        this.playSoundEffect('CARBON_DIVIDEND_SOUND');
        break;
      default:
        break;
    }
  }

  toggleMute() {
    this.setState({ muted: !this.state.muted })
    Howler.mute(!this.state.muted);
    this.drawBackground();
  }

  beginGameLoop() {
    let frames = 0;
    ///------------------ Main Game Loop --------------------------------------------------
    let gameLoopCallback = () => {
      let collided_obstacle_type = checkCollision(this.snake)
      if (frames === TOTAL_FRAMES_PER_SQUARE) {
        // == code here only runs when the snake reaches the ending edge of a square. ==
        if (collided_obstacle_type != null) {
          if (collided_obstacle_type === "WALL_COLLISION") this.playSoundEffect("WALL_BUMP_SOUND")
          else if (collided_obstacle_type === "SNAKE_SELF_COLLISION") this.playSoundEffect("SNAKE_BUMP_SOUND")
          else if (collided_obstacle_type === "HAZARD_COLLISION") this.playSoundEffect("WALL_BUMP_SOUND")
          this.gameOver();
          return;
        }
        let tokenConsumed = this.snake.move();
        this.playTokenSound(tokenConsumed);
        this.drawBackground();

        frames = 0;
        // ============================================================================
      }
      if (collided_obstacle_type == null) {
        this.drawSnakeAndItems(frames / TOTAL_FRAMES_PER_SQUARE);
        this.handleBackgroundSounds()
      } else {
        // ^ this else implies the player is about to run into some obstacle.
        this.playSoundEffect("COLLISON_NEAR_MISS_SOUND")
      }
      frames += 1;
      window.requestAnimationFrame(gameLoopCallback);
    }
    ///------------ End Main Game Loop (line below starts it for the first time) -----------------------
    window.requestAnimationFrame(gameLoopCallback);
  }

  render() {
    return (
      <article className="App">
        <div id="game-layout-container">
          <section className={'title-bar'}>
            <a href="https://docs.google.com/document/u/1/d/e/2PACX-1vRTTFMQzqHk4kxRdp1Q_66Ug-MkLma9_HTyk-2JrtDeKG_z8n_5sg3vAuaCHtTAQxsMK72lNx3IheEN/pub" className={'learn-link'} target="_blank" rel="noopener noreferrer">/ Learn \<br></br>\ More /</a>
            <h1 className={'title'}>Snakes and Apples </h1>
            <img className={'mute-button'} onClick={() => { this.toggleMute() }} alt={this.state.muted ? "unmute" : "mute"} src={this.state.muted ? MUTE_ICON : UNMUTE_ICON} role="button"></img>
          </section>
          <section className={'subtitle'} id={'game-subtitle'}>
            <h2 className={'score-container'}>Score: <span id={'score'}>0</span></h2>
            <h2 className={'concentration-container'}>Concentration: <span id={'concentration'}>278</span> ppm</h2>

          </section>
          <div id={'game-container'}>
            <canvas id={'background'} className={'background'} width={canvasWidth} height={canvasHeight} />
            <canvas id={'game'} className={'gameboard'} width={canvasWidth} height={canvasHeight} />
            <div id={'particles-viz'} />
            {this.state.showingStartScreen && <StartScreen onPlayClicked={() => { this.startCountdown() }}></StartScreen>}
            {this.state.showingGameOverScreen && <GameOverScreen></GameOverScreen>}
            {(this.state.countDownDigit > 0) && <h1 className='countdown-digit' >{this.state.countDownDigit}</h1>}
          </div>
          <a href="https://docs.google.com/document/u/1/d/e/2PACX-1vRTTFMQzqHk4kxRdp1Q_66Ug-MkLma9_HTyk-2JrtDeKG_z8n_5sg3vAuaCHtTAQxsMK72lNx3IheEN/pub" className={'credits-link'} target="_blank" rel="noopener noreferrer">Credits</a>
        </div>
      </article>
    );
  }
}

export default App;
