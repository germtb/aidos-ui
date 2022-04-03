import { OutgoingEffect } from "./Effect";
import { Target } from "./Target";
import { Resources } from "./components/Stats";
import { OutgoingModifier } from "./Modifier";

type Cost =
  | {
      type: keyof Resources;
      amount: number;
    }
  | {
      type: "none";
    };

export type ActiveSkill = Readonly<{
  type: "active";
  ID: string;
  name: string;
  effect: OutgoingEffect;
  targetMode: Target;
  castTime: number;
  cost: Cost;
}>;

export type PassiveSkill = Readonly<{
  type: "passive";
  ID: string;
  name: string;
  effect: OutgoingModifier;
}>;

export type Skill = PassiveSkill | ActiveSkill;
