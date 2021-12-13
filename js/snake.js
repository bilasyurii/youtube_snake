import RenderUtils from "./render-utils.js";
import Vector from "./vector.js";

export default class Snake {
  constructor(startingPos) {
    this.parts = [];
    this.direction = Direction.Up;
    this.newDirection = Direction.Up;
    this.timeToMove = 0;
    this.timeStep = 0.5;

    this._init(startingPos);
  }

  update(dt) {
    const time = this.timeToMove - dt;

    if (time <= 0) {
      const parts = this.parts;
      const count = parts.length;

      for (let i = count - 1; i > 0; --i) {
        const part = parts[i];
        const neighbor = parts[i - 1];
        part.copyFrom(neighbor);
      }

      let direction = this.direction;
      const newDirection = this.newDirection;

      if (direction === Direction.Up || direction === Direction.Down) {
        if (newDirection === Direction.Left || newDirection === Direction.Right) {
          direction = newDirection;
        }
      } else {
        if (newDirection === Direction.Up || newDirection === Direction.Down) {
          direction = newDirection;
        }
      }

      this.direction = direction;

      const head = parts[0];

      switch (direction) {
        case Direction.Up:
          --head.y;
          break;
        case Direction.Down:
          ++head.y;
          break;
        case Direction.Left:
          --head.x;
          break;
        case Direction.Right:
          ++head.x;
          break;
      }

      this.timeToMove = time + this.timeStep;
    } else {
      this.timeToMove = time;
    }
  }

  render(ctx) {
    const parts = this.parts;
    const count = parts.length;

    for (let i = 0; i < count; ++i) {
      const part = parts[i];
      RenderUtils.drawCircle(ctx, part.x, part.y, 'green');
    }
  }

  onKeyDown(key) {
    switch (key) {
      case 'ArrowUp':
      case 'KeyW':
        this.newDirection = Direction.Up;
        break;
      case 'ArrowDown':
      case 'KeyS':
        this.newDirection = Direction.Down;
        break;
      case 'ArrowLeft':
      case 'KeyA':
        this.newDirection = Direction.Left;
        break;
      case 'ArrowRight':
      case 'KeyD':
        this.newDirection = Direction.Right;
        break;
    }
  }

  checkApples(apples) {
    return this.checkHeadCollision(apples);
  }

  checkWalls(walls) {
    return this.checkHeadCollision(walls);
  }

  checkSelfCollision() {
    const body = this.parts.slice(1);
    return this.checkHeadCollision(body);
  }

  checkCollision(object) {
    const parts = this.parts;
    const count = parts.length;
    const objX = object.x;
    const objY = object.y;

    for (let i = 0; i < count; ++i) {
      const part = parts[i];

      if (part.x === objX && part.y === objY) {
        return part;
      }
    }

    return null;
  }

  grow() {
    const parts = this.parts;
    const tail = parts[parts.length - 1];
    parts.push(new Vector(tail.x, tail.y));
  }

  fasten() {
    this.timeStep *= 0.8;
  }

  checkHeadCollision(objects) {
    const count = objects.length;
    const head = this.parts[0];
    const headX = head.x;
    const headY = head.y;

    for (let i = 0; i < count; ++i) {
      const object = objects[i];

      if (object.x === headX && object.y === headY) {
        return object;
      }
    }

    return null;
  }

  _init(startingPos) {
    this._initStartingBody(startingPos);
  }

  _initStartingBody(startingPos) {
    const headX = startingPos.x;
    const headY = startingPos.y;
    const parts = this.parts;

    for (let i = 0; i < 3; ++i) {
      const part = new Vector(headX, headY + i);
      parts.push(part);
    }
  }
}

const Direction = {
  Up: 'Up',
  Down: 'Down',
  Left: 'Left',
  Right: 'Right',
};
