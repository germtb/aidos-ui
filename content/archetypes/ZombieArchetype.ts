import { amount, level, randomAmount, sum, variance } from "../../core/Amount";
import { Archetype } from "../../core/Archetype";
import { Currency } from "../../core/components/Inventory";
import { ActiveSkillType } from "../../core/Skill";

export const zombieArchetype: Archetype = {
  name: "Zombie",
  attributes: {
    body: sum(amount(3), level(0.5), randomAmount(1, 2)),
    mind: sum(amount(1)),
    soul: sum(amount(1), randomAmount(1, 2)),
  },
  loop: {
    skills: [
      {
        ID: ActiveSkillType.strike,
        level: 1,
      },
    ],
    capacity: 5,
  },
  inventory: {
    wallet: new Map([[Currency.Soul, randomAmount(5, 10)]]),
  },
};
