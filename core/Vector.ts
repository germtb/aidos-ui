export class Vector {
  private _x: number;
  private _y: number;

  public get x() {
    return this._x;
  }

  public get y() {
    return this._y;
  }

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  add(other: Vector): Vector {
    return new Vector(this._x + other._x, this._y + other._y);
  }

  substract(other: Vector): Vector {
    return new Vector(this._x - other._x, this._y - other._y);
  }

  times(scalar: number): Vector {
    return new Vector(this._x * scalar, this._y * scalar);
  }

  fastModule(): number {
    return this._x * this._x + this._y * this._y;
  }

  module(): number {
    return Math.sqrt(this.fastModule());
  }

  distance(other: Vector): number {
    return this.substract(other).module();
  }

  direction(): Vector {
    if (Math.abs(this._x) > Math.abs(this._y)) {
      return this._x > 0 ? Vector.RIGHT : Vector.LEFT;
    } else {
      return this._y > 0 ? Vector.UP : Vector.DOWN;
    }
  }

  toString() {
    return `${this._x}_${this._y}`;
  }

  static parse(string: string): Vector {
    const vector = string.split("_").map((number) => parseInt(number));

    if (vector.length === 2) {
      return new Vector(vector[0], vector[1]);
    } else {
      throw new Error(`Failed to parse, string is not a vector: ${string}`);
    }
  }

  static UP: Vector = new Vector(0, 1);
  static DOWN: Vector = new Vector(0, -1);
  static LEFT: Vector = new Vector(-1, 0);
  static RIGHT: Vector = new Vector(1, 0);
}

export function vector(x: number, y: number): Vector {
  return new Vector(x, y);
}
