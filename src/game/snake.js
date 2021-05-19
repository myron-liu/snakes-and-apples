import { Howl } from "howler"

import RED_APPLE_CRUNCH_SOUND from '../assets/sounds/red_apple_crunch_sound.mp3';
import RED_PIE_SOUND from '../assets/sounds/green_pie_sound.mp3';
import GREEN_APPLE_CRUCH_SOUND from '../assets/sounds/green_apple_crunch_sound.mp3';
import GREEN_PIE_SOUND from '../assets/sounds/green_pie_sound.mp3';
import GREEN_SUBSIDY_SOUND from '../assets/sounds/green_subsidy_sound.wav';
// import GREEN_SUBSIDY_BACKGROUND_SOUND from './assets/sounds/green_subsidy_background_sound.mp3';
import CARBON_TAX_SOUND from '../assets/sounds/carbon_tax_sound.wav';
// import CARBON_TAX_BACKGROUND_SOUND from './assets/sounds/carbon_tax_background_sound.mp3';
import CARBON_DIVIDEND_SOUND from '../assets/sounds/carbon_dividend_sound.mp3';


let AUDIO_CLIPS = {
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
}

/** Enum repsenting the token type. */
export const TOKEN_TYPE = {
  'RED_APPLE': 1,
  'RED_PIE': 2,
  'GREEN_APPLE': 3,
  'GREEN_PIE': 4,
  'GREEN_SUBSIDY': 5,
  'CARBON_DIVIDEND': 6,
  'CARBON_TAX': 7,
};

export const HAZARD_TYPE = {
  'DROUGHT': 8,
  'FIRE': 9,
  'FLOOD': 10,
};

export const GAME_HEIGHT = 16;
export const GAME_WIDTH = 16;


/** Enum representing score for type of token. */
export const TOKEN_SCORE = {
  [TOKEN_TYPE.RED_APPLE]: 1,
  [TOKEN_TYPE.RED_PIE]: 5,
  [TOKEN_TYPE.GREEN_APPLE]: 10,
  [TOKEN_TYPE.GREEN_PIE]: 20,
  [TOKEN_TYPE.GREEN_SUBSIDY]: 50,
  [TOKEN_TYPE.CARBON_TAX]: 150,
  [TOKEN_TYPE.CARBON_DIVIDEND]: 200,
};

export const TOKEN_CONCENTRATION = {
  [TOKEN_TYPE.RED_APPLE]: 5,
  [TOKEN_TYPE.RED_PIE]: 20,
  [TOKEN_TYPE.GREEN_APPLE]: -1,
  [TOKEN_TYPE.GREEN_PIE]: -2,
  [TOKEN_TYPE.GREEN_SUBSIDY]: -4,
  [TOKEN_TYPE.CARBON_TAX]: -5,
  [TOKEN_TYPE.CARBON_DIVIDEND]: -10,
}

/** Enum representing directions. */
export const DIRECTIONS = { 'UP': 1, 'DOWN': 2, 'LEFT': 3, 'RIGHT': 4 };

export const SNAKE_STATES = { ALIVE: 'ALIVE', DEAD: 'DEAD', INVINCIBLE: 'INVINCIBLE' };

/** Enum representing opposite directions. */
export const OPPOSITE_DIRECTIONS = {
  [DIRECTIONS.UP]: DIRECTIONS.DOWN,
  [DIRECTIONS.DOWN]: DIRECTIONS.UP,
  [DIRECTIONS.LEFT]: DIRECTIONS.RIGHT,
  [DIRECTIONS.RIGHT]: DIRECTIONS.LEFT
};



function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


/**
 * Snake class that holds the logic for the snake.
 * Represented as a linked list of coordinates.
 * We can use an array to represent the linked list.
 * The head is the start of the array.
 *
 * Snake begins horizontally from (startX, startY) with initial length.
 *
 * (x, y) on the grid starts in the top left as (0, 0).
 * Downwards y increases positively. Rightwards x increases positively.
 *
 * This also holds logic of the game grid including the tokens.
 */
export class Snake {
  constructor(startX, startY, initialLength, GAME_HEIGHT, GAME_WIDTH) {
    if ((startX - initialLength) < 0) {
      throw new Error(
        `Error initial length too long for start x location: ${startX} and initial length: ${initialLength}`
      );
    }
    this.gameHeight = GAME_HEIGHT;
    this.gameWidth = GAME_WIDTH;
    const headCoordinates = { x: startX, y: startY, direction: DIRECTIONS.RIGHT };
    this.snake = [];
    this.snake.push(headCoordinates);
    for (let i = 1; i < initialLength; i++) {
      this.snake.push({ x: startX - i, y: startY, direction: DIRECTIONS.RIGHT });
    }
    this.snakeState = SNAKE_STATES.ALIVE;
    this.prevSnake = null;
    this.points = 0;
    this.concentration = 278;
    this.tokens = [];
    this.hazards = [];
    this.moveNumber = 0;
    this.lastCarbonTax = 0;
    this.lastGreenSubsidy = 0;
    this.lastCarbonDividend = 0;
    this.invincibleModeNumber = 0;
    this.eating = false;
    this.fading = false;
    this.carbonTaxed = false;
    this.carbonTaxCount = 0;
  }

  setStateToDead() {
    this.snakeState = SNAKE_STATES.DEAD;
  }

  setStateToSpecial() {
    this.snakeState = SNAKE_STATES.SPECIAL;
  }

  setStateToAlive() {
    this.snakeState = SNAKE_STATES.ALIVE;
  }

  setStateToInvincible() {
    this.snakeState = SNAKE_STATES.INVINCIBLE;
  }

  getCarbonTaxed() {
    return this.carbonTaxed;
  }

  isEating() {
    return this.eating;
  }

  isFading() {
    return this.fading;
  }

  getState() {
    return this.snakeState;
  }

  getPoints() {
    return this.points;
  }

  getTokens() {
    return this.tokens;
  }

  getHazards() {
    return this.hazards;
  }

  getTokenIndex(x, y, tokens) {
    let index = null;
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (token.x === x && token.y === y) {
        index = i;
        break;
      }
    }
    return index;
  }

  consumeToken(x, y) {
    const index = this.getTokenIndex(x, y, this.tokens);
    if (index !== null) {
      const { tokenType } = this.tokens[index];
      this.tokens.splice(index, 1);
      this.points += TOKEN_SCORE[tokenType];
      if (this.concentration > 250) {
        this.concentration += TOKEN_CONCENTRATION[tokenType];
      }
      const scoreElem = document.getElementById('score');
      const concentrationElem = document.getElementById('concentration');
      if (scoreElem) {
        scoreElem.innerHTML = this.points;
      }
      if (concentrationElem) {
        concentrationElem.innerHTML = this.concentration;
      }
      return tokenType;
    }
    return null;
  }

  contains(x, y) {
    for (let i = 0; i < this.snake.length; i++) {
      const coordinates = this.snake[i];
      if (coordinates.x === x && coordinates.y === y) {
        return true;
      }
    }
    return false;
  };

  containsHazard(x, y) {
    for (let i = 0; i < this.hazards.length; i++) {
      const hazard = this.hazards[i];
      if (hazard.x === x && hazard.y === y) {
        return true;
      }
    }
    return false;
  }

  addToken(x, y, tokenType) {
    this.tokens.push({ x, y, tokenType });
  };

  addHazard(x, y, hazardType) {
    this.hazards.push({ x, y, hazardType });
  }

  clearTokens() {
    this.tokens = [];
  }

  clearHazards() {
    this.hazards = [];
  }

  /** Changes direction according the direction passed in. */
  changeDirection(direction) {
    this.getHead().direction = direction;
  };

  /** Get coordinates for the head. */
  getHead() {
    return this.snake[0];
  };

  /** Get direction. */
  getDirection() {
    return this.getHead().direction;
  };

  /** Gets the tail. */
  getTail() {
    return this.snake.slice(1, this.snake.length);
  };

  getSnake() {
    return this.snake;
  };

  getTailStart() {
    return this.snake[1];
  };

  getPrevSnakeHead() {
    return this.prevSnake[0];
  };

  getPrevSnakeTail() {
    return this.prevSnake.slice(1, this.prevSnake.length);
  };

  getNumTokensOfType(tokenType) {
    return this.tokens.filter(token => token.tokenType === tokenType).length;
  }

  getNumHazardsOfType(hazardType) {
    return this.hazards.filter(hazard => hazard.hazardType === hazardType).length;
  }

  hasToken(coordinates, x, y) {
    for (let i = 0; i < coordinates.length; i++) {
      if (coordinates[i].x === x && coordinates[i].y === y) {
        return true;
      }
    }
    return false;
  }

  generateFreeCoordinates() {
    const coordinates = [];
    const snakeCoordinates = this.getSnake().map((s) => {
      const { x, y } = s;
      return { x, y };
    });
    for (let i = 0; i < GAME_WIDTH; i++) {
      for (let j = 0; j < GAME_HEIGHT; j++) {
        const coordinate = { x: i, y: j };
        if (this.hasToken(this.hazards, coordinate.x, coordinate.y)) {
          continue;
        }
        if (!(this.hasToken(snakeCoordinates, coordinate.x, coordinate.y) || this.hasToken(this.tokens, coordinate.x, coordinate.y))) {
          coordinates.push(coordinate);
        }
      }
    }
    shuffleArray(coordinates);
    return coordinates;
  }

  generateHazard() {
    const coordinates = this.generateFreeCoordinates();
    if (coordinates.length > 0 && this.concentration > 400 && this.getNumHazardsOfType(HAZARD_TYPE.DROUGHT) === 0) {
      const { x, y } = coordinates.pop();
      this.addHazard(x, y, HAZARD_TYPE.DROUGHT);
    }

    if (coordinates.length > 0 && this.concentration > 425 && this.getNumHazardsOfType(HAZARD_TYPE.FIRE) === 0) {
      const { x, y } = coordinates.pop();
      this.addHazard(x, y, HAZARD_TYPE.FIRE);
    }

    if (coordinates.length > 0 && this.concentration > 450 && this.getNumHazardsOfType(HAZARD_TYPE.FLOOD) === 0) {
      const { x, y } = coordinates.pop();
      this.addHazard(x, y, HAZARD_TYPE.FLOOD);
    }

    if (coordinates.length > 0 && this.concentration > 475 && this.getNumHazardsOfType(HAZARD_TYPE.DROUGHT) === 1) {
      const { x, y } = coordinates.pop();
      this.addHazard(x, y, HAZARD_TYPE.DROUGHT);
    }

    if (coordinates.length > 0 && this.concentration > 500 && this.getNumHazardsOfType(HAZARD_TYPE.FIRE) === 1) {
      const { x, y } = coordinates.pop();
      this.addHazard(x, y, HAZARD_TYPE.FIRE);
    }

    if (coordinates.length > 0 && this.concentration > 525 && this.getNumHazardsOfType(HAZARD_TYPE.FLOOD) === 1) {
      const { x, y } = coordinates.pop();
      this.addHazard(x, y, HAZARD_TYPE.FLOOD);
    }

    if (coordinates.length > 0 && this.concentration > 550 && this.getNumHazardsOfType(HAZARD_TYPE.DROUGHT) === 2) {
      const { x, y } = coordinates.pop();
      this.addHazard(x, y, HAZARD_TYPE.DROUGHT);
    }

    if (coordinates.length > 0 && this.concentration > 575 && this.getNumHazardsOfType(HAZARD_TYPE.FIRE) === 2) {
      const { x, y } = coordinates.pop();
      this.addHazard(x, y, HAZARD_TYPE.FIRE);
    }

    if (coordinates.length > 0 && this.concentration > 600 && this.getNumHazardsOfType(HAZARD_TYPE.DROUGHT) === 3) {
      const { x, y } = coordinates.pop();
      this.addHazard(x, y, HAZARD_TYPE.DROUGHT);
    }

    if (coordinates.length > 0 && this.concentration > 625 && this.getNumHazardsOfType(HAZARD_TYPE.FIRE) === 3) {
      const { x, y } = coordinates.pop();
      this.addHazard(x, y, HAZARD_TYPE.FIRE);
    }

    if (coordinates.length > 0 && this.concentration > 575 && this.getNumHazardsOfType(HAZARD_TYPE.DROUGHT) === 4) {
      const { x, y } = coordinates.pop();
      this.addHazard(x, y, HAZARD_TYPE.DROUGHT);
    }
  }

  generateToken() {
    const coordinates = this.generateFreeCoordinates();

    // RED_APPLE rules
    let maxRedApples = 1;
    if (this.carbonTaxed) {
      maxRedApples = 0;
    }
    else if (this.concentration > 450) {
      maxRedApples = 16;
    }
    else if (this.concentration > 400) {
      maxRedApples = 8;
    }
    else if (this.concentration > 350) {
      maxRedApples = 4;
    }
    else if (this.concentration > 300) {
      maxRedApples = 2;
    }
    let redAppleCounter = 0;
    let currentNumRedApples = this.getNumTokensOfType(TOKEN_TYPE.RED_APPLE);
    let totalRedApplesToSpawn = currentNumRedApples < maxRedApples ? Math.random() * (maxRedApples - Math.max(currentNumRedApples, 1)) + 1 : 0;
    let numRedApples = this.getNumTokensOfType(TOKEN_TYPE.RED_APPLE);
    while (coordinates.length > 0 && redAppleCounter < totalRedApplesToSpawn && numRedApples <= maxRedApples) {
      const { x, y } = coordinates.pop();
      this.addToken(x, y, TOKEN_TYPE.RED_APPLE);
      redAppleCounter += 1;
    }

    // RED_PIE rules
    let maxRedPies = 0;
    if (this.carbonTaxed) {
      maxRedPies = 0;
    }
    else if (this.concentration > 500) {
      maxRedPies = 5;
    }
    else if (this.concentration > 400) {
      maxRedPies = 2;
    }
    else if (this.concentration > 300) {
      maxRedPies = 1;
    }
    let redPieCounter = 0;
    let totalRedPiesToSpawn = maxRedPies - this.getNumTokensOfType(TOKEN_TYPE.RED_PIE);
    while (coordinates.length > 0 && redPieCounter < totalRedPiesToSpawn) {
      const { x, y } = coordinates.pop();
      this.addToken(x, y, TOKEN_TYPE.RED_PIE);
      redPieCounter += 1;
    }

    // GREEN_APPLE rules
    let maxGreenApples = 0;
    if (this.carbonTaxed) {
      maxGreenApples = 1;
    }
    if (this.concentration > 300) {
      maxGreenApples = 1;
    }
    if (this.concentration > 350) {
      maxGreenApples = 2;
    }
    if (this.concentration > 400) {
      maxGreenApples = 4;
    }
    if (this.concentration > 500) {
      maxGreenApples = 8;
    }
    let greenAppleCounter = 0;
    let totalGreenApplesToSpawn = maxGreenApples - this.getNumTokensOfType(TOKEN_TYPE.GREEN_APPLE);
    while (coordinates.length > 0 && greenAppleCounter < totalGreenApplesToSpawn) {
      const { x, y } = coordinates.pop();
      this.addToken(x, y, TOKEN_TYPE.GREEN_APPLE);
      greenAppleCounter += 1;
    }

    // GREEN_PIE rules
    let maxGreenPies = 0;
    if (this.carbonTaxed) {
      maxGreenPies = 1;
    }
    if (this.concentration > 350) {
      maxGreenPies = 1;
    }
    if (this.concentration > 450) {
      maxGreenPies = 2;
    }
    if (this.concentration > 550) {
      maxGreenPies = 4;
    }
    let greenPieCounter = 0;
    let totalGreenPiesToSpawn = maxGreenPies - this.getNumTokensOfType(TOKEN_TYPE.GREEN_PIE);
    while (coordinates.length > 0 && greenPieCounter < totalGreenPiesToSpawn) {
      const { x, y } = coordinates.pop();
      this.addToken(x, y, TOKEN_TYPE.GREEN_PIE);
      greenPieCounter += 1;
    }

    // GREEN SUBSIDY rules
    const greenSubsidyExists = this.getNumTokensOfType(TOKEN_TYPE.GREEN_SUBSIDY) >= 1;
    if (this.concentration > 380 && this.moveNumber > this.lastGreenSubsidy + 250 && coordinates.length > 0 && !greenSubsidyExists) {
      const { x, y } = coordinates.pop();
      this.addToken(x, y, TOKEN_TYPE.GREEN_SUBSIDY);
      this.lastGreenSubsidy = this.moveNumber;
    }

    // CARBON TAX rules
    const carbonTaxExists = this.getNumTokensOfType(TOKEN_TYPE.CARBON_TAX) >= 1;
    if (this.concentration > 350 && this.moveNumber > this.lastCarbonTax + 200 && coordinates.length > 0 && !carbonTaxExists) {
      const { x, y } = coordinates.pop();
      this.addToken(x, y, TOKEN_TYPE.CARBON_TAX);
      this.lastCarbonTax = this.moveNumber;
    }

    // CARBON DIVIDEND rules
    const carbonDividendExists = this.getNumTokensOfType(TOKEN_TYPE.CARBON_DIVIDEND) >= 1;
    if (this.concentration > 360 && this.moveNumber > this.lastCarbonDividend + 500 && coordinates.length > 0 && !carbonDividendExists) {
      const { x, y } = coordinates.pop();
      this.addToken(x, y, TOKEN_TYPE.CARBON_DIVIDEND);
      this.lastCarbonDividend = this.moveNumber;
    }
  }

  /** Moves the snake in the direction it is currently moving in. */
  move() {
    this.prevSnake = this.snake.slice();
    const head = this.getHead();
    const direction = this.getDirection();
    const { x, y } = head;

    this.moveNumber += 1;
    this.invincibleModeNumber += 1;
    this.eating = false;

    const snakeState = this.getState();
    const isInvincible = snakeState === SNAKE_STATES.INVINCIBLE;

    if (isInvincible && this.invincibleModeNumber >= 100) {
      this.fading = true;
    }
    if (isInvincible && this.invincibleModeNumber >= 150) {
      this.setStateToAlive();
      this.fading = false;
    }
    if (this.carbonTaxCount >= 60) {
      this.carbonTaxed = false;
      this.carbonTaxCount = 0;
    }
    if (this.carbonTaxed) {
      this.carbonTaxCount += 1;
    }
    switch (direction) {
      case DIRECTIONS.UP:
        if (isInvincible && y - 1 === -1) {
          this.snake.unshift({ x, y: GAME_HEIGHT - 1, direction });
        }
        else {
          this.snake.unshift({ x, y: y - 1, direction });
        }
        break;
      case DIRECTIONS.DOWN:
        if (isInvincible && y + 1 === GAME_HEIGHT) {
          this.snake.unshift({ x, y: 0, direction });
        }
        else {
          this.snake.unshift({ x, y: y + 1, direction });
        }
        break;
      case DIRECTIONS.LEFT:
        if (isInvincible && x - 1 === -1) {
          this.snake.unshift({ x: GAME_WIDTH - 1, y, direction });
        }
        else {
          this.snake.unshift({ x: x - 1, y, direction });
        }
        break;
      case DIRECTIONS.RIGHT:
        if (isInvincible && x + 1 === GAME_WIDTH) {
          this.snake.unshift({ x: 0, y, direction });
        }
        else {
          this.snake.unshift({ x: x + 1, y, direction });
        }
        break;
      default:
        break;
    }
    const newHead = this.getHead();
    let shouldEatNow = this.hasToken(this.tokens, newHead.x, newHead.y);
    let shouldEat = false;
    switch (newHead.direction) {
      case DIRECTIONS.UP:
        if (isInvincible && y - 1 === -1) {
          shouldEat = this.hasToken(this.tokens, newHead.x, GAME_HEIGHT - 1);
        }
        else {
          shouldEat = this.hasToken(this.tokens, newHead.x, newHead.y - 1);
        }
        break;
      case DIRECTIONS.DOWN:
        if (isInvincible && y + 1 === GAME_HEIGHT) {
          shouldEat = this.hasToken(this.tokens, newHead.x, 0);
        }
        else {
          shouldEat = this.hasToken(this.tokens, newHead.x, newHead.y + 1);
        }
        break;
      case DIRECTIONS.LEFT:
        if (isInvincible && x - 1 === -1) {
          shouldEat = this.hasToken(this.tokens, GAME_WIDTH - 1, newHead.y);
        }
        else {
          shouldEat = this.hasToken(this.tokens, newHead.x - 1, newHead.y);
        }
        break;
      case DIRECTIONS.RIGHT:
        if (isInvincible && x + 1 === GAME_HEIGHT) {
          shouldEat = this.hasToken(this.tokens, 0, newHead.y);
        }
        else {
          shouldEat = this.hasToken(this.tokens, newHead.x + 1, newHead.y);
        }
        break;
      default:
        break;
    }
    shouldEat = shouldEat || shouldEatNow;
    if (shouldEat) {
      this.eating = true;
    }

    const tokenType = this.consumeToken(newHead.x, newHead.y);
    switch (tokenType) {
      case TOKEN_TYPE.RED_APPLE:
        // play crunch sound:
        AUDIO_CLIPS['RED_APPLE_CRUNCH_SOUND'].play();
        this.generateToken();
        break;
      case TOKEN_TYPE.RED_PIE:
        // play crunch sound:
        AUDIO_CLIPS['RED_PIE_SOUND'].play();
        this.generateToken();
        break;
      case TOKEN_TYPE.GREEN_APPLE:
        // play crunch sound:
        AUDIO_CLIPS['GREEN_APPLE_CRUNCH_SOUND'].play();
        this.generateToken();
        break;
      case TOKEN_TYPE.GREEN_PIE:
        this.snake.pop();
        this.generateToken();
        AUDIO_CLIPS['GREEN_PIE_SOUND'].play();
        break;
      case TOKEN_TYPE.GREEN_SUBSIDY:
        const poppingLevel = Math.floor(0.4 * this.snake.length);
        let counter = 0;
        while (counter < poppingLevel && this.snake.length) {
          this.snake.pop();
          counter += 1;
        }
        this.generateToken(false);
        AUDIO_CLIPS['GREEN_SUBSIDY_SOUND'].play();
        break;
      case TOKEN_TYPE.CARBON_TAX:
        this.snake.pop();
        this.tokens
          .filter(token => token.tokenType === TOKEN_TYPE.RED_PIE && token.tokenType === TOKEN_TYPE.RED_APPLE)
          .forEach(token => {
            this.points += TOKEN_SCORE[token.tokeType];
            const scoreElem = document.getElementById('score');
            if (scoreElem) {
              scoreElem.innerHTML = this.points;
            }
          })
        this.tokens = this.tokens.filter(token => token.tokenType !== TOKEN_TYPE.RED_PIE && token.tokenType !== TOKEN_TYPE.RED_APPLE);
        this.carbonTaxed = true;
        this.carbonTaxCount = 0;
        this.generateToken();
        AUDIO_CLIPS['CARBON_TAX_SOUND'].play();
        break;
      case TOKEN_TYPE.CARBON_DIVIDEND:
        this.snake.pop();
        this.generateToken(false);
        this.invincibleModeNumber = 0;
        this.setStateToInvincible();
        this.fading = false;
        AUDIO_CLIPS['CARBON_DIVIDEND_SOUND'].play();
        break;
      default:
        this.snake.pop();
        break;
    }
    this.generateHazard();
  }
}