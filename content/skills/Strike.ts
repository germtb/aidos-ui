import { body, level, randomAmount, sum } from "../../core/Amount";
import { Element } from "../../core/components/Stats";
import { damage } from "../../core/Effect";
import { ActiveSkill } from "../../core/Skill";
import { seconds } from "../../core/World";

export const strike: ActiveSkill = {
  ID: "strike",
  name: "Strike",
  effect: [
    damage(sum(randomAmount(5, 10), level(0.5), body(0.5)), Element.physical),
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
