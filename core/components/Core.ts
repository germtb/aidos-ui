import { GameComponent } from "../GameComponent";
import { Character } from "../entities/Character";
import { Tier } from "../Essence";
import { resolveModifier, OutgoingModifier } from "../Modifier";
import { Source } from "./Stats";

export type Core = {
  name: string;
  tier: Tier;
  modifier: OutgoingModifier;
};

export class CoreComponent implements GameComponent {
  private core: Core;
  private level: number;
  private character: Character;

  constructor(core: Core, character: Character) {
    this.core = core;
    this.character = character;
  }

  upgrade() {
    if (this.level < 10) this.level += 1;
    this.apply();
  }

  onStart() {
    this.apply();
  }

  private apply() {
    this.character.getStats().addModifier(
      Source.core,
      resolveModifier(this.core.modifier, {
        character: this.character,
        level: this.level,
      })
    );
  }

  onDestroy() {
    this.character.getStats().removeModifier(Source.core);
  }

  onFrame() {}
}
