import { Entity } from "../../core/Entity";
import { Archetype, Essence, SkillType, Tier } from "../../core/Skill";

export const wait: Archetype = {
  ID: SkillType.wait,
  name: "Wait",
  effect: () => [
    {
      entity: Entity.effect,
      type: "nothing",
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
  potencyRange: [0, 0],
  cost: {
    type: "none",
  },
};
