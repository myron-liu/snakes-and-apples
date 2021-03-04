/** Enum repsenting the token type. */
export const TOKEN_TYPE = {'EVIL': 1, 'NEUTRAL': 2, 'GOOD': 3};

/** Enum representing score for type of token. */
export const TOKEN_SCORE = {[TOKEN_TYPE.EVIL]: 1, [TOKEN_TYPE.NEUTRAL]: 2, [TOKEN_TYPE.GOOD]: 4};

/** Enum representing directions. */
export const DIRECTIONS = {'UP': 1, 'DOWN': 2, 'LEFT': 3, 'RIGHT': 4};

/** Enum representing opposite directions. */
export const OPPOSITE_DIRECTIONS = {
  [DIRECTIONS.UP] : DIRECTIONS.DOWN, 
  [DIRECTIONS.DOWN] : DIRECTIONS.UP, 
  [DIRECTIONS.LEFT] : DIRECTIONS.RIGHT, 
  [DIRECTIONS.RIGHT] : DIRECTIONS.LEFT
};

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
    this.snake.push(headCoordinates)
    for (let i = 1; i < initialLength; i++) {
      this.snake.push({ x: startX - i, y: startY, direction: DIRECTIONS.RIGHT });
    }
    this.points = 0;
    this.evilTokens = [];
    this.neutralTokens = [];
    this.goodTokens = [];
  }

  getPoints() {
    return this.points;
  }

  consumeEvilToken(x, y) {
    let index = null;
    let tokens = this.evilTokens;
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (token.x === x && token.y === y) {
        index = i;
        break;
      }
    }
    if (index !== null) {
      tokens.splice(index, 1);
      this.points += TOKEN_SCORE[TOKEN_TYPE.EVIL];
      const scoreElem = document.getElementById('score');
      if (scoreElem) {
        scoreElem.innerHTML = this.points;
      }
      return true;
    }
    return false;
  }

  consumeNeutralToken(x, y) {
    let index = null;
    let tokens = this.neutralTokens;
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (token.x === x && token.y === y) {
        index = i;
        break;
      }
    }
    if (index !== null) {
      tokens.splice(index, 1);
      this.points += TOKEN_SCORE[TOKEN_TYPE.NEUTRAL];
      const scoreElem = document.getElementById('score');
      if (scoreElem) {
        scoreElem.innerHTML = this.points;
      }
      return true;
    }
    return false;
  }

  consumeGoodToken(x, y) {
    let index = null;
    let tokens = this.goodTokens;
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (token.x === x && token.y === y) {
        index = i;
        break;
      }
    }
    if (index !== null) {
      tokens.splice(index, 1);
      this.points += TOKEN_SCORE[TOKEN_TYPE.GOOD];
      const scoreElem = document.getElementById('score');
      if (scoreElem) {
        scoreElem.innerHTML = this.points;
      }
      return true;
    }
    return false;
  }


  contains(x, y) {
    for (let i = 0; i < this.snake.length; i++) {
      const coordinates = this.snake[i];
      if (coordinates.x === x && coordinates.y === y) {
        return true;
      }
    }
    return false;
  }

  /** Add evil token to snake map. */
  addEvilToken(x, y) {
    this.evilTokens.push({x, y});
  }

   /** Add neutral token to snake map. */
  addNeutralToken(x, y) {
    this.neutralTokens.push({x, y});
  }

  /** Add good token to snake map. */
  addGoodToken(x, y) {
    this.goodTokens.push({x, y});
  }

  /** Gets tokens. */
  getEvilTokens() {
    return this.evilTokens;
  }

  /** Gets tokens. */
  getNeutralTokens() {
    return this.neutralTokens;
  }
    
  /** Gets tokens. */
  getGoodTokens() {
    return this.goodTokens;
  }
    
  
  /** Changes direction according the direction passed in. */
  changeDirection(direction) {
    this.getHead().direction = direction;
  }

  /** Get coordinates for the head. */
  getHead() {
    return this.snake[0];
  }

  /** Get direction. */
  getDirection() {
    return this.getHead().direction;
  }

  /** Gets the tail. */
  getTail() {
    return this.snake.slice(1, this.snake.length);
  }

  getSnake() {
    return this.snake;
  }

  getTailStart() {
    return this.snake[1];
  }

  /** Moves the snake in the direction it is currently moving in. */
  move() {
    const head = this.getHead();
    const direction = this.getDirection();
    const { x, y } = head;
    switch(direction) {
      case DIRECTIONS.UP:
        this.snake.unshift({ x, y: y - 1, direction });
        break;
      case DIRECTIONS.DOWN:
        this.snake.unshift({ x, y: y + 1, direction }); 
        break;
      case DIRECTIONS.LEFT:
        this.snake.unshift({ x: x - 1, y, direction });
        break; 
      case DIRECTIONS.RIGHT:
        this.snake.unshift({ x: x + 1, y, direction });
        break;
      default:
        break;
    }
    const newHead = this.getHead();

    const consumedGoodToken = this.consumeGoodToken(newHead.x, newHead.y);
    if (consumedGoodToken && this.snake.length > 3) {
      this.snake.pop();
      this.snake.pop();
      return;
    }
    
    const consumedNeutralToken = this.consumeNeutralToken(newHead.x, newHead.y);
    if (consumedNeutralToken) {
      this.snake.pop();
      return;
    }

    const consumedEvilToken = this.consumeEvilToken(newHead.x, newHead.y);
    if (!consumedEvilToken) {
      this.snake.pop();
      return;
    }
  }
}