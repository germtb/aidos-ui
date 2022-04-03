import { roll100 } from "../utils/roll100";
import { amount, Amount, resolveAmount } from "./Amount";
import { Element } from "./components/Stats";
import { Context } from "./Context";
import { Character } from "./entities/Character";
import { Incoming, Outgoing } from "./Types";

export const NOTHING: Nothing = {
  type: "nothing",
};

type Nothing = {
  type: "nothing";
};

export type Damage = {
  type: "damage";
  element: Element;
};

type DrainMana = {
  type: "drainMana";
};

type Heal = {
  type: "heal";
};

type RestoreMana = {
  type: "restoreMana";
};

type Multi = {
  type: "multi";
  effect: OutgoingEffect;
};

type IncomingDelay = Incoming<{
  type: "delay";
  effect: IncomingEffect;
}>;

type OutgoingDelay = Outgoing<{
  type: "delay";
  effect: OutgoingEffect;
}>;

type IncomingDurationEffect = Incoming<{
  type: "duration";
  effect: IncomingEffect;
  name: string;
}>;

type OutgoingDurationEffect = Outgoing<{
  type: "duration";
  effect: OutgoingEffect;
  name: string;
}>;

export type IncomingEffect =
  | Nothing
  | Incoming<Damage>
  | Incoming<DrainMana>
  | Incoming<Heal>
  | Incoming<RestoreMana>
  | IncomingDelay
  | Array<IncomingEffect>
  | IncomingDurationEffect;

export type OutgoingEffect =
  | Nothing
  | Outgoing<Damage>
  | Outgoing<DrainMana>
  | Outgoing<Heal>
  | Outgoing<RestoreMana>
  | Outgoing<Multi>
  | OutgoingDelay
  | Array<OutgoingEffect>
  | OutgoingDurationEffect;

export function damage(amount: Amount, element: Element): Outgoing<Damage> {
  return {
    type: "damage",
    amount,
    element,
  };
}

export function drainMana(amount: Amount): Outgoing<DrainMana> {
  return {
    type: "drainMana",
    amount,
  };
}

export function heal(amount: Amount): Outgoing<Heal> {
  return {
    type: "heal",
    amount,
  };
}

export function restoreMana(amount: Amount): Outgoing<RestoreMana> {
  return {
    type: "restoreMana",
    amount,
  };
}

export function multi(amount: Amount, effect: OutgoingEffect): Outgoing<Multi> {
  return {
    type: "multi",
    effect,
    amount,
  };
}

export function delay(amount: Amount, effect: OutgoingEffect): OutgoingDelay {
  return {
    type: "delay",
    effect,
    amount,
  };
}

export function duration(
  amount: Amount,
  effect: OutgoingEffect,
  name: string
): OutgoingDurationEffect {
  return {
    type: "duration",
    effect,
    name,
    amount,
  };
}

export function resolveEffect(
  effect: OutgoingEffect,
  context: Context
): IncomingEffect {
  if (Array.isArray(effect)) {
    return effect.map((e) => resolveEffect(e, context));
  }

  switch (effect.type) {
    case "nothing":
      return effect;
    case "multi":
      return Array.from(
        { length: resolveAmount(effect.amount, context) },
        (_) => resolveEffect(effect.effect, context)
      );
    case "delay":
      return {
        ...effect,
        amount: resolveAmount(effect.amount, context),
        effect: resolveEffect(effect.effect, context),
      };
    case "restoreMana":
    case "drainMana":
    case "heal":
      return {
        ...effect,
        amount: resolveAmount(effect.amount, context),
      };
    case "damage":
      const baseAmount = resolveAmount(effect.amount, context);
      const amount =
        roll100() > context.stats.critChance
          ? baseAmount
          : baseAmount * context.stats.critModifier;
      return {
        ...effect,
        amount,
      };
    case "duration":
      return {
        ...effect,
        amount: resolveAmount(effect.amount, context),
        effect: resolveEffect(effect.effect, context),
      };
    default: {
      const _: never = effect;
      return _;
    }
  }
}
