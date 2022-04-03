import { Amount, Operation, resolveAmount } from "./Amount";
import {
  Attributes,
  DamageStats,
  Resources,
  SecondaryStats,
  ResistanceStats,
} from "./components/Stats";
import { Context } from "./Context";
import { Damage } from "./Effect";
import { Character } from "./entities/Character";
import { Incoming, Outgoing } from "./Types";

export type Nothing = {
  type: "nothing";
};

type IncreaseAttribute = {
  type: "increaseAttribute";
  attribute: keyof Attributes;
  operation: Operation;
};

type IncreaseResource = {
  type: "increaseResource";
  resource: keyof Resources;
  operation: Operation;
};

type IncreaseStat = {
  type: "increaseStat";
  stat: keyof SecondaryStats;
  operation: Operation;
};

type IncreaseDamage = {
  type: "increaseDamage";
  element: keyof DamageStats;
  operation: Operation;
};

type IncreaseResistance = {
  type: "increaseResistance";
  element: keyof ResistanceStats;
  operation: Operation;
};

export function increaseAttribute(
  attribute: keyof Attributes,
  operation: Operation,
  amount: Amount
): Outgoing<IncreaseAttribute> {
  return {
    type: "increaseAttribute",
    attribute,
    operation,
    amount,
  };
}

export function increaseResource(
  resource: keyof Resources,
  operation: Operation,
  amount: Amount
): Outgoing<IncreaseResource> {
  return {
    type: "increaseResource",
    resource,
    operation,
    amount,
  };
}

export function increaseStat(
  stat: keyof SecondaryStats,
  operation: Operation,
  amount: Amount
): Outgoing<IncreaseStat> {
  return {
    type: "increaseStat",
    stat,
    operation,
    amount,
  };
}

export function increaseDamage(
  element: keyof DamageStats,
  operation: Operation,
  amount: Amount
): Outgoing<IncreaseDamage> {
  return {
    type: "increaseDamage",
    element,
    operation,
    amount,
  };
}

export function increaseResistance(
  element: keyof ResistanceStats,
  operation: Operation,
  amount: Amount
): Outgoing<IncreaseResistance> {
  return {
    type: "increaseResistance",
    element,
    operation,
    amount,
  };
}

export function resolveModifier(
  modifier: OutgoingModifier,
  context: Context
): IncomingModifier {
  if (Array.isArray(modifier)) {
    return modifier.map((m) => resolveModifier(m, context));
  }

  switch (modifier.type) {
    case "increaseStat":
    case "increaseResource":
    case "increaseResource":
    case "increaseAttribute":
    case "increaseResistance":
    case "increaseDamage": {
      return {
        ...modifier,
        amount: resolveAmount(modifier.amount, context),
      };
    }
    default:
      const _: never = modifier;
      return _;
  }
}

export type IncomingModifier =
  | Incoming<IncreaseAttribute>
  | Incoming<IncreaseResource>
  | Incoming<IncreaseStat>
  | Incoming<IncreaseDamage>
  | Incoming<IncreaseResistance>
  | Array<IncomingModifier>;

export type OutgoingModifier =
  | Outgoing<IncreaseAttribute>
  | Outgoing<IncreaseResource>
  | Outgoing<IncreaseStat>
  | Outgoing<IncreaseDamage>
  | Outgoing<IncreaseResistance>
  | Array<OutgoingModifier>;

// We exclude Array types so that the structure is flat and can be ordered, so sums and products can be applied differently
export type FlatModifier =
  | Incoming<IncreaseAttribute>
  | Incoming<IncreaseResource>
  | Incoming<IncreaseStat>
  | Incoming<IncreaseDamage>
  | Incoming<IncreaseResistance>;
