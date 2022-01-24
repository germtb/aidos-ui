import { Attributes } from "./Attribute";
import { Entity } from "./Entity";
import { Resources } from "./Resource";
import { SkillLoop } from "./SkillLoop";
import { Effect } from "./Effect";
import { Physical } from "./Physical";
import { Tuple1to8 } from "./Tuples";
import { ActiveSkill, SkillType } from "./Skill";
import { Faction } from "./Faction";
import { Movement } from "./Movement";
import { Controller } from "./Controller";

const XP_FOR_LEVEL = (level: number) => {
  return level * level * 1000;
};

// Level 1 => 0
// Level 2 => 4000
// Level 3 => 9000
// Level 4 => 16000
// Level 5 => 25000
// Level 6 => 36000
// Level 7 => 42000
// Level 8 => 64000
// Level 9 => 81000

export type Character = {
  name: string;
  level: number;
  xp: number;
  attributePoints: number;
  entity: Entity.character;
  attributes: Attributes;
  resources: Resources;
  faction: Faction;
  loop: SkillLoop;
  controller: Controller;
  effects: Effect[];
  movements: Movement[];
} & Physical;

export type Archetype = {
  level: number;
  name: string;
  entity: Entity.archetype;
  attributes: Attributes;
  resources: {
    health: {
      max: number;
    };
    stamina: {
      max: number;
    };
    mana: {
      max: number;
    };
  };
  loop: {
    skills: Tuple1to8<ActiveSkill>;
    capacity: number;
  };
  controller: Controller;
  faction: Faction;
  drops: Array<{
    chance: number;
    ID: SkillType;
  }>;
};

export function addXP(character: Character, xp: number) {
  character.xp += xp;
  maybeLevelUp(character);
}

export function maybeLevelUp(character: Character) {
  const nextLevelXP = XP_FOR_LEVEL(character.level);

  if (character.xp >= nextLevelXP) {
    character.attributePoints += 1;
    maybeLevelUp(character);
  }
}
