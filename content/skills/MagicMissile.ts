import { level, mind, product, randomAmount, sum } from "../../core/Amount";
import { Element } from "../../core/components/Stats";
import { Essence, Tier } from "../../core/Essence";
import { ActiveSkillDefinition, ActiveSkillType } from "../../core/Skill";
import { seconds } from "../../core/World";

export const magicMissile: ActiveSkillDefinition = {
  ID: ActiveSkillType.magicMissile,
  name: "Magic missile",
  effect: [
    {
      type: "damage",
      element: Element.trascendent,
      amount: product(randomAmount(3, 5), mind(0.5)),
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
