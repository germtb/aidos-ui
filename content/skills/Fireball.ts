import { mind, product, randomAmount, sum } from "../../core/Amount";
import { Element } from "../../core/components/Stats";
import { Essence, Tier } from "../../core/Essence";
import { ActiveSkillDefinition, ActiveSkillType } from "../../core/Skill";
import { seconds } from "../../core/World";

export const fireball: ActiveSkillDefinition = {
  ID: ActiveSkillType.fireball,
  name: "Fireball",
  effect: {
    type: "damage",
    element: Element.fire,
    amount: product(randomAmount(3, 5), mind(1)),
  },
  targetMode: {
    type: "foesInRange",
    range: 3,
  },
  castTime: seconds(3),
  essence: Essence.Might,
  tier: Tier.F,
  cost: {
    type: "mana",
    amount: 25,
  },
};
