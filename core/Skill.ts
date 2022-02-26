import { OutgoingEffect } from "./Effect";
import { Target } from "./Target";
import { Essence, Tier } from "./Essence";
import { Resources } from "./components/Stats";
import { OutgoingModifier } from "./Modifier";

type BaseSkill = {
  ID: ActiveSkillType;
  level: number;
};

export type ActiveSkill = BaseSkill & {};

export type PassiveSkill = BaseSkill & {};

export enum ActiveSkillType {
  fireball = "fireball",
  wait = "wait",
  bodySlam = "bodySlam",
  strike = "strike",
  magicMissile = "magicMissile",
  doubleStrike = "doubleStrike",
}

type Cost =
  | {
      type: keyof Resources;
      amount: number;
    }
  | {
      type: "none";
    };

export type ActiveSkillDefinition = {
  ID: ActiveSkillType;
  name: string;
  effect: OutgoingEffect;
  targetMode: Target;
  essence: Essence;
  tier: Tier;
  castTime: number;
  cost: Cost;
};

export type PassiveSkillDefinition = {
  name: string;
  effect: OutgoingModifier;
  tier: Tier;
};

export type Skill = ActiveSkill;
