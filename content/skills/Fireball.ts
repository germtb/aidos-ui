import { Entity } from "../../core/Entity";
import { Archetype, Essence, SkillType, Tier } from "../../core/Skill";

export const fireball: Archetype = {
  ID: SkillType.fireball,
  name: "Fireball",
  effect: ({ potency }) => [
    {
      entity: Entity.effect,
      type: "addResource",
      resource: "health",
      amount: -potency,
      passive: false,
    },
  ],
  targetMode: {
    entity: Entity.target,
    type: "circle",
    range: 3,
    radius: 1,
    affects: "all",
  },
  cooldown: 4,
  essence: Essence.Might,
  tier: Tier.F,
  potencyRange: [10, 20],
  cost: {
    type: "mana",
    amount: 25,
  },
};
