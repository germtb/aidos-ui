import { Position } from "../Entity";
import { guid } from "../../utils/guid";
import { instantiate } from "../World";
import { Character } from "../entities/Character";
import { GameComponent } from "../GameComponent";
import { Archetype } from "../Archetype";
import { EncounterComponent } from "./Encounter";

export type Wave = {
  name: string;
  archetypes: Array<Archetype>;
  cooldown: number;
  jitter: number;
  max: number;
  level: number;
  length: number;
};

export class WaveComponent implements GameComponent {
  readonly ID: string;
  private readonly wave: Wave;
  private readonly encounter: EncounterComponent;
  private localTime: number = 0;
  private progress: number = 0;
  private subscriptions: Array<() => void> = [];

  constructor(encounter: EncounterComponent, config: Wave, ID = guid()) {
    this.ID = ID;
    this.encounter = encounter;
    this.wave = config;
  }

  onStart() {}

  onFrame() {
    this.localTime += 1;

    if (this.progress >= this.wave.length) {
      return;
    }

    if (this.localTime >= this.wave.cooldown) {
      if (
        this.encounter.getMonsterSide().filter((m) => m.isAlive()).length <
        this.wave.max
      ) {
        this.addMonster();
      }

      this.localTime = 0;
    }
  }

  onDestroy() {
    this.subscriptions.forEach((s) => s());
  }

  getName() {
    return this.wave.name;
  }

  private addMonster() {
    const archetype = this.wave.archetypes[
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
