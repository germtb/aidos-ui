import { Entity } from "../../core/Entity";
import { Archetype, Essence, SkillType, Tier } from "../../core/Skill";

export const basicAttack: Archetype = {
  ID: SkillType.basicAttack,
  name: "Basic attack",
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
    type: "nearestFoe",
    range: 1,
  },
  cooldown: 2,
  essence: Essence.Might,
  tier: Tier.F,
  potencyRange: [5, 10],
  cost: {
    type: "stamina",
    amount: 10,
  },
};
