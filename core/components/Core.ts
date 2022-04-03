import { CharacterComponent, GameComponent } from "../GameComponent";
import { Character } from "../entities/Character";
import { Tier } from "../Tier";
import { resolveModifier, OutgoingModifier } from "../Modifier";
import { Source } from "./Stats";

export type Core = {
  name: string;
  tier: Tier;
  modifier: OutgoingModifier;
};

export class CoreComponent extends CharacterComponent {
  private core: Core;
  private level: number;

  constructor(character: Character, core: Core) {
    super(character);
    this.core = core;
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
        stats: this.character.getStats().getSecondaryStats(),
        attributes: this.character.getStats().getAttributes(),
        level: this.level,
        skills: this.character.getSkills().getSkills(),
      })
    );
  }

  onDestroy() {
    this.character.getStats().removeModifier(Source.core);
  }

  onFrame() {}
}
