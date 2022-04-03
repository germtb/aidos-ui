import { mind, product, randomAmount } from "../../core/Amount";
import { Element } from "../../core/components/Stats";
import { damage } from "../../core/Effect";
import { ActiveSkill } from "../../core/Skill";
import { seconds } from "../../core/World";

export const magicMissile: ActiveSkill = {
  ID: "magicMissile",
  name: "Magic missile",
  effect: [damage(product(randomAmount(3, 5), mind(0.5)), Element.trascendent)],
  targetMode: {
    type: "nearestFoe",
    range: 1,
  },
  castTime: seconds(2),
  cost: {
    type: "none",
  },
  type: "active",
};
