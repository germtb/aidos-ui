import { Entity, Position } from "../Entity";
import { guid } from "../../utils/guid";
import {
  INITIAL_ATTRIBUTES,
  INITIAL_STATS,
  StatsComponent,
} from "../components/Stats";
import { SkillsComponent } from "../components/Skills";
import { Currency, InventoryComponent } from "../components/Inventory";
import { createCallbackSet } from "../../utils/CallbackSet";
import { Archetype } from "../Archetype";
import { resolveAmount } from "../Amount";
import { EncounterComponent } from "../components/Encounter";
import { Context } from "../Context";
import { Fragment, Upgrade } from "../Upgrade";

export class Character extends Entity {
  readonly archetype: Archetype;
  private level: number;
  private alive: boolean = true;
  private onDieCallbacks = createCallbackSet<void>();
  private upgrades: Array<Upgrade> = [];
  private fragments: Array<Fragment> = [];

  constructor(
    archetype: Archetype,
    position: Position,
    encounter: EncounterComponent,
    level: number,
    ID = guid()
  ) {
    super(ID, position);
    this.level = level;
    this.archetype = archetype;
    this.upgrades.push(...archetype.upgrades);
    this.addComponent(
      new StatsComponent(this, {
        attributes: {
          body: resolveAmount(archetype.attributes.body, {
            level,
            attributes: INITIAL_ATTRIBUTES,
            stats: INITIAL_STATS,
            skills: archetype.skills.skills,
          }),
          mind: resolveAmount(archetype.attributes.mind, {
            level,
            attributes: INITIAL_ATTRIBUTES,
            stats: INITIAL_STATS,
            skills: archetype.skills.skills,
          }),
          soul: resolveAmount(archetype.attributes.soul, {
            level,
            attributes: INITIAL_ATTRIBUTES,
            stats: INITIAL_STATS,
            skills: archetype.skills.skills,
          }),
        },
      })
    );
    this.addComponent(new SkillsComponent(this, encounter));
    this.addComponent(new InventoryComponent(this, archetype.inventory.wallet));
  }

  getUpgrades(): Array<Upgrade> {
    return this.upgrades;
  }

  tryPurchase(upgrade: Upgrade) {
    const index = this.upgrades.indexOf(upgrade);
    if (index === -1) {
      return false;
    }

    const cost = this.getUpgradeCost();

    if (this.getInventory().trySpend(Currency.Soul, cost)) {
      this.getSkills().addSkill(upgrade.skill);
      this.upgrades.splice(index, 1, ...upgrade.next);

      for (const fragment of upgrade.fragments) {
        const fragmentIndex = this.fragments.findIndex(
          (f) => f.upgrade === fragment.upgrade
        );

        if (fragmentIndex === -1) {
          this.fragments[fragmentIndex].progress += fragment.progress;
        } else {
          this.fragments.push(fragment);
        }
      }

      const fullFragments = this.fragments.filter(
        (f) => f.progress >= f.amount
      );

      fullFragments.forEach((f) => {
        this.fragments.splice(this.fragments.indexOf(f), 1);
        this.upgrades.push(f.upgrade);
      });

      this.levelUp();
      return true;
    } else {
      return false;
    }
  }

  getStats(): StatsComponent {
    return this.getComponent(StatsComponent);
  }

  getSkills(): SkillsComponent {
    return this.getComponent(SkillsComponent);
  }

  getInventory(): InventoryComponent {
    return this.getComponent(InventoryComponent);
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

  getLevel(): number {
    return this.level;
  }

  getUpgradeCost(): number {
    return this.getLevel();
  }

  levelUp() {
    this.level += 1;
  }

  asContext(): Context {
    return {
      attributes: this.getStats().getAttributes(),
      stats: this.getStats().getSecondaryStats(),
      level: this.level,
      skills: this.getSkills().getSkills(),
    };
  }
}
