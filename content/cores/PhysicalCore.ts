import { Operation } from "../../core/Amount";
import { Core } from "../../core/components/Core";
import { Tier } from "../../core/Essence";

export const PhysicalCore: Core = {
  name: "Physical core",
  tier: Tier.F,
  modifier: [
    {
      type: "increaseAttribute",
      attribute: "soul",
      amount: { type: "flat", amount: 10 },
      operation: Operation.Sum,
    },
    {
      type: "increaseAttribute",
      attribute: "mind",
      amount: { type: "flat", amount: 10 },
      operation: Operation.Sum,
    },
    {
      type: "increaseAttribute",
      attribute: "body",
      amount: { type: "flat", amount: 10 },
      operation: Operation.Sum,
    },
  ],
};
