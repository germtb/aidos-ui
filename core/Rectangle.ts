import { Vector } from "./Vector";

export class Rectangle {
  private _width: number;
  private _height: number;
  private _origin: Vector;

  public get width() {
    return this._width;
  }

  public get height() {
    return this._height;
  }

  public get origin() {
    return this._origin;
  }

  constructor(origin: Vector, height: number, width: number) {
    this._origin = origin;
    this._height = height;
    this._width = width;
  }

  contains(point: Vector): boolean {
    return (
      this._origin.x <= point.x &&
      this._origin.x + this._width > point.x &&
      this._origin.y <= point.y &&
      this._origin.y + this._height > point.y
    );
  }
}

export function rectangle(
  origin: Vector,
  height: number,
  width: number
): Rectangle {
  return new Rectangle(origin, height, width);
}
