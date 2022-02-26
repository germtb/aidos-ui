import { roll100 } from "../utils/roll100";
import { Amount, resolveAmount } from "./Amount";
import { Element } from "./components/Stats";
import { Character } from "./entities/Character";
import {
  IncomingModifier,
  OutgoingModifier,
  resolveModifier,
} from "./Modifier";
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

export function resolveEffect(
  effect: OutgoingEffect,
  context: {
    character: Character;
    level: number;
  }
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
      const stats = context.character.getStats().getSecondaryStats();
      const amount =
        roll100() > stats.critChance
          ? baseAmount
          : baseAmount * stats.critModifier;
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
