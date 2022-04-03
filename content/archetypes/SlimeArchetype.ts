import { amount, level, randomAmount, sum } from "../../core/Amount";
import { Archetype } from "../../core/Archetype";
import { Currency } from "../../core/components/Inventory";
import { bodySlam } from "../skills/BodySlam";

export const slimeArchetype: Archetype = {
  name: "Slime",
  attributes: {
    body: sum(amount(10), level(1), randomAmount(1, 2)),
    mind: sum(amount(1)),
    soul: sum(amount(1), randomAmount(1, 2)),
  },
  skills: {
    skills: [bodySlam],
    capacity: 5,
  },
  inventory: {
    wallet: new Map([[Currency.Soul, randomAmount(5, 10)]]),
  },
  upgrades: [],
};
