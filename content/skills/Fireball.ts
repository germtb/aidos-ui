import { mind, product, randomAmount } from "../../core/Amount";
import { Element } from "../../core/components/Stats";
import { damage } from "../../core/Effect";
import { ActiveSkill } from "../../core/Skill";
import { seconds } from "../../core/World";

export const fireball: ActiveSkill = {
  ID: "fireball",
  name: "Fireball",
  effect: damage(product(randomAmount(3, 5), mind(1)), Element.fire),
  targetMode: {
    type: "foesInRange",
    range: 3,
  },
  castTime: seconds(3),
  cost: {
    type: "mana",
    amount: 25,
  },
  type: "active",
};
