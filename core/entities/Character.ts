import { Entity, Position } from "../Entity";
import { guid } from "../../utils/guid";
import { StatsComponent } from "../components/Stats";
import { GameComponent } from "../GameComponent";
import { LoopComponent } from "../components/Loop";
import { InventoryComponent } from "../components/Inventory";
import { createCallbackSet } from "../../utils/CallbackSet";
import { Archetype } from "../Archetype";
import { resolveAmount } from "../Amount";
import { EncounterComponent } from "../components/Encounter";

export class Character implements Entity {
  readonly archetype: Archetype;
  readonly ID: string;
  readonly position: Position;
  private readonly stats: StatsComponent;
  private readonly loop: LoopComponent;
  private readonly inventory: InventoryComponent;
  private alive: boolean = true;
  private onDieCallbacks = createCallbackSet<void>();

  constructor(
    archetype: Archetype,
    position: Position,
    encounter: EncounterComponent,
    level: number,
    ID = guid()
  ) {
    this.ID = ID;
    this.archetype = archetype;
    this.stats = new StatsComponent(
      {
        attributes: {
          body: resolveAmount(archetype.attributes.body, { level }),
          mind: resolveAmount(archetype.attributes.mind, { level }),
          soul: resolveAmount(archetype.attributes.soul, { level }),
        },
      },
      level,
      this
    );
    this.loop = new LoopComponent(this, encounter);
    this.inventory = new InventoryComponent(archetype.inventory.wallet);
    this.position = position;
  }

  getComponents(): GameComponent[] {
    return [this.stats, this.loop, this.inventory];
  }

  getStats(): StatsComponent {
    return this.stats;
  }

  getLoop(): LoopComponent {
    return this.loop;
  }

  getInventory(): InventoryComponent {
    return this.inventory;
  }

  die() {
    this.alive = false;
    this.onDieCallbacks.call();
    this.onDieCallbacks.clear();
  }

  onDie(cb: () => void) {
    return this.onDieCallbacks.add(cb);
  }

  isAlive() {
    return this.alive;
  }
}
