import { Operation } from "../Amount";
import { CharacterComponent, GameComponent } from "../GameComponent";
import { Damage, IncomingEffect } from "../Effect";
import { Character } from "../entities/Character";
import { FlatModifier, IncomingModifier } from "../Modifier";
import { Incoming } from "../Types";
import { roll100 } from "../../utils/roll100";
import { Skill } from "../Skill";

export type Attributes = {
  body: number;
  mind: number;
  soul: number;
};

export type Resource = {
  max: number;
  current: number;
};

export type Resources = {
  life: Resource;
  mana: Resource;
};

export type SecondaryStats = {
  // Regen
  lifeRegen: number;
  manaRegen: number;
  // Critical
  critChance: number;
  critModifier: number;
  // Leech
  lifeLeech: number;
  manaLeech: number;
  // Defense
  evasion: number;
  block: number;
  // Attack
  splash: number;
  cleave: number;
};

export const INITIAL_ATTRIBUTES: Attributes = {
  body: 5,
  mind: 5,
  soul: 5,
};

export const INITIAL_STATS: SecondaryStats = {
  // Regen
  lifeRegen: 0,
  manaRegen: 0,
  // Critical
  critChance: 5,
  critModifier: 1.5,
  // Leech
  lifeLeech: 0,
  manaLeech: 0,
  // Defense
  evasion: 0,
  block: 0,
  // Attack
  splash: 0,
  cleave: 0,
};

export enum Element {
  fire,
  cold,
  lighitning,
  trascendent,
  physical,
}

export type DamageStats = {
  [element in Element]: number;
};

export type ResistanceStats = {
  [element in Element]: number;
};

export enum Source {
  core,
}

export type InitialStats = {
  attributes: Attributes;
};

export class StatsComponent extends CharacterComponent {
  private resources: {
    life: number;
    mana: number;
  };
  private modifiers: Map<Source, IncomingModifier>;
  private attributes: Attributes;
  private delayedEffects: Array<{
    delay: number;
    effect: IncomingEffect;
  }> = [];
  private durationEffects: Array<{
    duration: number;
    effect: IncomingEffect;
  }> = [];

  constructor(character: Character, initialStats: InitialStats) {
    super(character);
    this.attributes = initialStats.attributes;
    this.resources = {
      life: this.getMaxLife(),
      mana: this.getMaxMana(),
    };
    this.modifiers = new Map();
  }

  onStart() {}

  onDestroy() {}

  onFrame() {
    if (!this.character.isAlive()) {
      return;
    }

    const secondaryStats = this.getSecondaryStats();

    this.modifyHealth(secondaryStats.lifeRegen);
    this.modifyMana(secondaryStats.manaRegen);

    this.runDelayedEffects();
    this.runDurationEffects();
  }

  private runDelayedEffects() {
    const _delayedEffects = [];

    while (this.delayedEffects.length) {
      const effect = this.delayedEffects.pop();

      if (effect.delay <= 0) {
        this.receiveEffect(effect.effect);
      } else {
        _delayedEffects.push({
          delay: effect.delay - 1,
          effect: effect.effect,
        });
      }
    }

    while (_delayedEffects.length) {
      this.delayedEffects.push(_delayedEffects.pop());
    }
  }

  private runDurationEffects() {
    this.durationEffects.forEach(({ effect }) => {
      this.receiveEffect(effect);
    });
    this.durationEffects = this.durationEffects
      .map(({ duration, effect }) => ({ duration: duration - 1, effect }))
      .filter(({ duration }) => duration > 0);
  }

  getAttributes(): Attributes {
    return this.attributes;
  }

  getCurrentLife() {
    return this.resources.life;
  }

  getCurrentMana() {
    return this.resources.mana;
  }

  getMaxLife() {
    return this.getAttributes().body * 10;
  }

  getMaxMana() {
    return this.getAttributes().soul * 10;
  }

  private getModifiers(): Array<FlatModifier> {
    const modifiersStack = Array.from(this.modifiers.values());
    const sums: Array<FlatModifier> = [];
    const products: Array<FlatModifier> = [];
    const powers: Array<FlatModifier> = [];

    while (modifiersStack.length) {
      const modifier = modifiersStack.pop();

      if (Array.isArray(modifier)) {
        modifiersStack.push(...modifier);
      } else {
        if (modifier.operation === Operation.Sum) {
          sums.push(modifier);
        } else if (modifier.operation === Operation.Product) {
          products.push(modifier);
        } else if (modifier.operation === Operation.Power) {
          powers.push(modifier);
        }
      }
    }

    return powers.concat(products).concat(sums);
  }

  getResistanceStats(): ResistanceStats {
    return this.getModifiers().reduce(
      (acc: ResistanceStats, modifier: FlatModifier) => {
        if (modifier.type === "increaseResistance") {
          acc[modifier.element] = resolveStat(acc[modifier.element], modifier);
        }

        return acc;
      },
      {
        [Element.fire]: 0,
        [Element.cold]: 0,
        [Element.lighitning]: 0,
        [Element.trascendent]: 0,
        [Element.physical]: 0,
      }
    );
  }

  getDamageStats(): DamageStats {
    return this.getModifiers().reduce(
      (acc: DamageStats, modifier: FlatModifier) => {
        if (modifier.type === "increaseResistance") {
          acc[modifier.element] = resolveStat(acc[modifier.element], modifier);
        }

        return acc;
      },
      {
        [Element.fire]: 0,
        [Element.cold]: 0,
        [Element.lighitning]: 0,
        [Element.trascendent]: 0,
        [Element.physical]: 0,
      }
    );
  }

  getSecondaryStats(): SecondaryStats {
    return this.getModifiers().reduce(
      (acc: SecondaryStats, modifier: FlatModifier) => {
        if (modifier.type === "increaseStat") {
          acc[modifier.stat] = resolveStat(acc[modifier.stat], modifier);
        }

        return acc;
      },
      INITIAL_STATS
    );
  }

  getResources(): Resources {
    return {
      life: {
        max: this.getMaxLife(),
        current: this.resources.life,
      },
      mana: {
        max: this.getMaxMana(),
        current: this.resources.mana,
      },
    };
  }

  addModifier(source: Source, modifier: IncomingModifier): void {
    this.modifiers.set(source, modifier);
  }

  removeModifier(source: Source): void {
    this.modifiers.delete(source);
  }

  trySpend(resourceType: keyof Resources, amount: number): boolean {
    const resource = this.resources[resourceType];

    if (resource >= amount) {
      this.resources[resourceType] -= amount;
      return true;
    } else {
      return false;
    }
  }

  receiveEffect(effect: IncomingEffect): void {
    const state = {
      health: 0,
      mana: 0,
    };

    const effectStack = [effect];

    while (effectStack.length) {
      const effect = effectStack.pop();

      if (Array.isArray(effect)) {
        effectStack.push(...effect);
        continue;
      }

      switch (effect.type) {
        case "nothing":
          continue;
        case "duration":
          this.durationEffects.push({
            duration: effect.amount,
            effect: effect.effect,
          });
          continue;
        case "delay":
          this.delayedEffects.push({
            delay: effect.amount,
            effect: effect.effect,
          });
          continue;
        case "restoreMana": {
          state.mana += effect.amount;
          continue;
        }
        case "drainMana": {
          state.mana -= effect.amount;
          continue;
        }
        case "heal": {
          state.health += effect.amount;
          continue;
        }
        case "damage": {
          state.health -= this.calculateDamage(effect);
          continue;
        }
        default:
          const _: never = effect;
      }
    }

    this.modifyHealth(state.health);
    this.modifyMana(state.mana);
  }

  private calculateDamage(damage: Incoming<Damage>) {
    const stats = this.getSecondaryStats();

    if (roll100() < stats.evasion) {
      return 0;
    }

    const element = damage.element;
    const resistances = this.getResistanceStats();

    return (damage.amount * (100 - resistances[element])) / 100;
  }

  private modifyHealth(amount: number) {
    this.resources.life += amount;

    if (this.resources.life > this.getMaxLife()) {
      this.resources.life = this.getMaxLife();
    }

    if (this.resources.life < 0) {
      this.resources.life = 0;
    }
  }

  private modifyMana(amount: number) {
    this.resources.mana += amount;

    if (this.resources.mana > this.getMaxMana()) {
      this.resources.mana = this.getMaxMana();
    }

    if (this.resources.mana < 0) {
      this.resources.mana = 0;
    }
  }
}

function resolveStat(number: number, modifier: FlatModifier): number {
  switch (modifier.operation) {
    case Operation.Sum:
      return (number += modifier.amount);
    case Operation.Product:
      return (number *= modifier.amount);
    case Operation.Power:
      return (number ^= modifier.amount);
  }
}
