import { amount, level, randomAmount, sum } from "../../core/Amount";
import { Archetype } from "../../core/Archetype";
import { Currency } from "../../core/components/Inventory";
import { ActiveSkillType } from "../../core/Skill";

export const slimeArchetype: Archetype = {
  name: "Slime",
  attributes: {
    body: sum(amount(10), level(1), randomAmount(1, 2)),
    mind: sum(amount(1)),
    soul: sum(amount(1), randomAmount(1, 2)),
  },
  loop: {
    skills: [
      {
        ID: ActiveSkillType.bodySlam,
        level: 1,
      },
    ],
    capacity: 5,
  },
  inventory: {
    wallet: new Map([[Currency.Soul, randomAmount(5, 10)]]),
  },
};
