import { Amount } from "./Amount";
import { Currency } from "./components/Inventory";
import { ActiveSkill } from "./Skill";

export type Archetype = {
  name: string;
  attributes: {
    body: Amount;
    mind: Amount;
    soul: Amount;
  };
  loop: {
    skills: Array<ActiveSkill>;
    capacity: number;
  };
  inventory: {
    wallet: Map<Currency, Amount>;
  };
};
