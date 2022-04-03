import { Amount } from "./Amount";
import { Currency } from "./components/Inventory";
import { Skill } from "./Skill";
import { Fragment, Upgrade } from "./Upgrade";

export type Archetype = {
  name: string;
  attributes: {
    body: Amount;
    mind: Amount;
    soul: Amount;
  };
  skills: {
    skills: Array<Skill>;
    capacity: number;
  };
  inventory: {
    wallet: Map<Currency, Amount>;
  };
  upgrades: Array<Upgrade>;
};
