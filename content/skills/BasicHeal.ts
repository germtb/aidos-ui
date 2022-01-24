import { Entity } from "../../core/Entity";
import { Archetype, Essence, SkillType, Tier } from "../../core/Skill";

export const basicHeal: Archetype = {
  ID: SkillType.basicHeal,
  name: "Basic attack",
  effect: ({ potency }) => [
    {
      entity: Entity.effect,
      type: "addResource",
      resource: "health",
      amount: potency,
      passive: false,
    },
  ],
  targetMode: {
    entity: Entity.target,
    type: "self",
  },
  cooldown: 1,
  essence: Essence.Might,
  tier: Tier.F,
  potencyRange: [5, 10],
  cost: {
    type: "mana",
    amount: 10,
  },
};
