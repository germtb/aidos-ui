import { guid } from "../utils/guid";
import { Character } from "./entities/Character";

export abstract class GameComponent {
  readonly ID: string;

  constructor(ID: string = guid()) {
    this.ID = ID;
  }

  onStart(): void {}
  onFrame(): void {}
  onDestroy(): void {}
}

export abstract class CharacterComponent extends GameComponent {
  protected readonly character: Character;

  constructor(character: Character) {
    super();
    this.character = character;
  }
}
