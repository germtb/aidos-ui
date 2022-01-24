import { Archetype } from "../../core/Character";
import { Entity } from "../../core/Entity";
import { Faction } from "../../core/Faction";
import { SkillType } from "../../core/Skill";

export const characterArchetype: Archetype = {
  name: "Hero",
  level: 1,
  entity: Entity.archetype,
  attributes: {
    might: {
      entity: Entity.attribute,
      value: 5,
    },
    speed: {
      entity: Entity.attribute,
      value: 5,
    },
    mind: {
      entity: Entity.attribute,
      value: 5,
    },
  },
  resources: {
    health: {
      max: 100,
    },
    stamina: {
      max: 100,
    },
    mana: {
      max: 100,
    },
  },
  loop: {
    skills: [
      {
        ID: SkillType.basicAttack,
        entity: Entity.skill,
        potency: 5,
        xp: 0,
      },
    ],
    capacity: 5,
  },
  faction: Faction.cultivators,
  drops: [],
  controller: [],
};
