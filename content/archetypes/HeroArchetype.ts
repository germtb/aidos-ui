import { amount, randomAmount } from "../../core/Amount";
import { Archetype } from "../../core/Archetype";
import { Currency } from "../../core/components/Inventory";
import { ActiveSkillType } from "../../core/Skill";

export const heroArchetype: Archetype = {
  name: "Hero",
  attributes: {
    body: amount(20),
    mind: amount(20),
    soul: amount(20),
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
