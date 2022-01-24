export class Resource {
  private _value: number;
  private _max: number;

  public get value() {
    return this._value;
  }

  public get max() {
    return this._max;
  }

  constructor(max: number, value: number = max) {
    this._max = max;
    this._value = value;
  }

  add(amount: number) {
    this._value += amount;

    if (this._value < 0) {
      this._value = 0;
    } else if (this._value > this._max) {
      this._value = this._max;
    }
  }

  increaseMax(amount: number) {
    this._max += amount;

    if (this._value > this._max) {
      this._value = this._max;
    }
  }
}

export type Resources = {
  health: Resource;
  stamina: Resource;
  mana: Resource;
};
