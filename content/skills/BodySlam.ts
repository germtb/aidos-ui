import { body, randomAmount, sum } from "../../core/Amount";
import { Element } from "../../core/components/Stats";
import { damage } from "../../core/Effect";
import { ActiveSkill } from "../../core/Skill";
import { seconds } from "../../core/World";

export const bodySlam: ActiveSkill = {
  ID: "bodySlam",
  name: "Basic attack",
  effect: damage(sum(randomAmount(5, 10), body(1)), Element.physical),
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
