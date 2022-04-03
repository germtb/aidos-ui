import { amount, body, level, randomAmount, sum } from "../../core/Amount";
import { Element } from "../../core/components/Stats";
import { damage, delay } from "../../core/Effect";
import { ActiveSkill } from "../../core/Skill";
import { seconds } from "../../core/World";

export const doubleStrike: ActiveSkill = {
  ID: "doubleStrike",
  name: "Double strike",
  effect: [
    damage(sum(randomAmount(5, 10), level(0.5), body(0.5)), Element.physical),
    delay(
      amount(0),
      damage(sum(randomAmount(5, 10), level(0.5), body(0.5)), Element.physical)
    ),
  ],
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
