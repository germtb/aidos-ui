import { amount, randomAmount } from "../../core/Amount";
import { Archetype } from "../../core/Archetype";
import { Currency } from "../../core/components/Inventory";
import { strike } from "../skills/Strike";
import { body1, mind1, soul1 } from "../upgrades/bodyUpgrades";

export const heroArchetype: Archetype = {
  name: "Hero",
  attributes: {
    body: amount(20),
    mind: amount(20),
    soul: amount(20),
  },
  skills: {
    skills: [strike],
    capacity: 5,
  },
  inventory: {
    wallet: new Map([[Currency.Soul, randomAmount(5, 10)]]),
  },
  upgrades: [body1, mind1, soul1],
};
