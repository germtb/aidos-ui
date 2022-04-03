import { Position } from "../Entity";
import { Character } from "../entities/Character";
import { GameComponent } from "../GameComponent";

export class EncounterComponent extends GameComponent {
  private readonly positionMap = {
    [Position.Hero]: new Map(),
    [Position.Monster]: new Map(),
    [Position.None]: new Map(),
  };

  constructor() {
    super();
  }

  onStart() {}

  onFrame() {}

  onDestroy() {}

  getMySide(character: Character): Array<Character> {
    return Array.from(this.positionMap[character.position].values()).filter(
      (c) => c.isAlive()
    );
  }

  getOtherSide(character: Character): Array<Character> {
    if (character.position === Position.Hero) {
      return Array.from(this.positionMap[Position.Monster].values()).filter(
        (c) => c.isAlive()
      );
    } else if (character.position === Position.Monster) {
      return Array.from(this.positionMap[Position.Hero].values()).filter((c) =>
        c.isAlive()
      );
    }

    return [];
  }

  getHeroSide(): Array<Character> {
    return Array.from(this.positionMap[Position.Hero].values());
  }

  getMonsterSide(): Array<Character> {
    return Array.from(this.positionMap[Position.Monster].values());
  }

  add(character: Character): void {
    this.positionMap[character.position].set(character.ID, character);
  }

  remove(character: Character): void {
    this.positionMap[character.position].delete(character.ID);
  }
}
