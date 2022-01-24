import { Character } from "./Character";
import { Effect } from "./Effect";
import { Entity } from "./Entity";
import { skillMap } from "../content/skills/SkillMap";
import { findTarget, Target } from "./Target";
import { World } from "./World";
import { Resources } from "./Resource";

export enum Essence {
  Ice,
  Wind,
  Earth,
  Water,
  Dark,
  Light,
  Might,
  Speed,
}

export enum Tier {
  SS, // 128
  S, // 64
  A, // 32
  B, // 16
  C, // 8
  D, // 4
  E, // 2
  F, // 1
}

type BaseSkill = {
  ID: SkillType;
  entity: Entity.skill;
  xp: number;
  potency: number;
};

export type ActiveSkill = BaseSkill & {};

export enum SkillType {
  basicAttack = "basicAttack",
  basicHeal = "basicHeal",
  fireball = "fireball",
  wait = "wait",
  seek = "seek",
}

type Cost =
  | {
      type: keyof Resources;
      amount: number;
    }
  | {
      type: "none";
    };

export type Archetype = {
  ID: SkillType;
  name: string;
  effect: ({
    potency,
    character,
    world,
  }: {
    potency: number;
    character: Character;
    world: World;
  }) => Effect[];
  targetMode: Target;
  essence: Essence;
  tier: Tier;
  cooldown: number;
  potencyRange: [min: number, max: number];
  cost: Cost;
};

export type Skill = ActiveSkill;

export function tryActivateSkill(
  skill: ActiveSkill,
  character: Character,
  world: World
): boolean {
  const skillArchetype = skillMap[skill.ID];
  const cost = skillArchetype.cost;

  if (cost.type !== "none") {
    const resource = character.resources[cost.type];

    if (resource.value >= cost.amount) {
      resource.add(-cost.amount);
      character.effects.push({
        entity: Entity.effect,
        type: "exhausted",
        passive: false,
      });
    } else {
      return true;
    }
  }

  const targets = findTarget(skillArchetype.targetMode, character, world);

  if (targets.length === 0) {
    return false;
  }

  for (const target of targets) {
    target.effects.push(
      ...skillArchetype.effect({ potency: skill.potency, character, world })
    );
  }

  return true;
}

export function toXP(skill: Skill): number {
  return Math.max(skill.xp, 1);
}

export function addXP(skill: Skill, xp: number) {
  skill.xp += xp;
  maybeLevelUp(skill);
}

function maybeLevelUp(skill: Skill) {
  if (skill.xp >= 100) {
    skill.xp -= 100;
    skill.potency += 1;
    maybeLevelUp(skill);
  }
}
