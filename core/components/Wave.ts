import { Position } from "../Entity";
import { guid } from "../../utils/guid";
import {
  instantiate,
  MEDIUM_DELAY,
  setFrameTimeout,
  SHORT_DELAY,
} from "../World";
import { Character } from "../entities/Character";
import { GameComponent } from "../GameComponent";
import { Archetype } from "../Archetype";
import { EncounterComponent } from "./Encounter";

export type Wave = {
  name: string;
  archetypes: Array<Archetype>;
  max: number;
  level: number;
  length: number;
};

export class WaveComponent implements GameComponent {
  readonly ID: string;
  private readonly wave: Wave;
  private readonly encounter: EncounterComponent;
  private progress: number = 0;
  private subscriptions: Array<() => void> = [];
  private addMonsterQueued = false;

  constructor(encounter: EncounterComponent, config: Wave, ID = guid()) {
    this.ID = ID;
    this.encounter = encounter;
    this.wave = config;
  }

  onStart() {}

  onFrame() {
    if (this.progress >= this.wave.length) {
      return;
    }

    if (
      this.encounter.getMonsterSide().filter((m) => m.isAlive()).length <= 0 &&
      !this.addMonsterQueued
    ) {
      this.addMonsterQueued = true;
      setFrameTimeout(() => {
        this.encounter.getMonsterSide().forEach((monster) => {
          this.encounter.remove(monster);
        });
        this.addMonster(Math.floor(Math.random() * this.wave.max));
        this.addMonsterQueued = false;
      }, MEDIUM_DELAY);
    }
  }

  onDestroy() {
    this.subscriptions.forEach((s) => s());
  }

  getName() {
    return this.wave.name;
  }

  private addMonster(count: number) {
    for (let i = 0; i <= count; i++) {
      const archetype =
        this.wave.archetypes[
          Math.floor(Math.random() * this.wave.archetypes.length)
        ];

      const monster = new Character(
        archetype,
        Position.Monster,
        this.encounter,
        this.wave.level
      );

      this.subscriptions.push(
        monster.onDie(() => {
          this.progress += 1;
        })
      );

      instantiate(monster);

      this.encounter.add(monster);
    }
  }
}
