import { Operation } from "../../core/Amount";
import { Core } from "../../core/components/Core";
import { Element } from "../../core/components/Stats";
import { Tier } from "../../core/Tier";

export const ColdCore: Core = {
  name: "Cold core",
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
