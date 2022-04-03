import { amount, Operation } from "../../core/Amount";
import { increaseAttribute } from "../../core/Modifier";
import { Skill } from "../../core/Skill";
import { Upgrade } from "../../core/Upgrade";

function createUpgradeChain(
  count: number,
  skillFactory: (index: number) => Skill
): Upgrade {
  let last = null;

  for (let i = count; i >= 1; i--) {
    const upgrade: Upgrade = {
      skill: skillFactory(i),
      next: last ? [last] : [],
      fragments: [],
    };
    last = upgrade;
  }

  return last;
}

export const body1: Upgrade = createUpgradeChain(100, (index) => ({
  type: "passive",
  ID: `body${index}`,
  name: `Body ${index}`,
  effect: increaseAttribute("body", Operation.Sum, amount(1)),
}));

export const soul1: Upgrade = createUpgradeChain(100, (index) => ({
  type: "passive",
  ID: `soul${index}`,
  name: `Soul ${index}`,
  effect: increaseAttribute("soul", Operation.Sum, amount(1)),
}));

export const mind1: Upgrade = createUpgradeChain(100, (index) => ({
  type: "passive",
  ID: `mind${index}`,
  name: `Mind ${index}`,
  effect: increaseAttribute("mind", Operation.Sum, amount(1)),
}));
