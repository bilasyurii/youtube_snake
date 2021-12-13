export default class Vector {
  constructor(x = 0, y = x) {
    this.x = x;
    this.y = y;
  }

  add(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  getLength() {
    const x = this.x;
    const y = this.y;
    return Math.sqrt(x * x + y * y);
  }

  clone() {
    return new Vector(this.x, this.y);
  }

  copyFrom(v) {
    this.x = v.x;
    this.y = v.y;
    return this;
  }
}