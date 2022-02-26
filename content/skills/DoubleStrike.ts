import { amount, body, level, randomAmount, sum } from "../../core/Amount";
import { Element } from "../../core/components/Stats";
import { Essence, Tier } from "../../core/Essence";
import { ActiveSkillDefinition, ActiveSkillType } from "../../core/Skill";
import { seconds } from "../../core/World";

export const doubleStrike: ActiveSkillDefinition = {
  ID: ActiveSkillType.doubleStrike,
  name: "Double strike",
  effect: [
    {
      type: "damage",
      element: Element.physical,
      amount: sum(randomAmount(5, 10), level(0.5), body(0.5)),
    },
    {
      type: "delay",
      amount: amount(0),
      effect: {
        type: "damage",
        element: Element.physical,
        amount: sum(randomAmount(5, 10), level(0.5), body(0.5)),
      },
    },
  ],
  targetMode: {
    type: "nearestFoe",
    range: 1,
  },
  castTime: seconds(2),
  essence: Essence.Might,
  tier: Tier.F,
  cost: {
    type: "none",
  },
};
