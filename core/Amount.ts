import { Attributes } from "./components/Stats";
import { Context } from "./Context";

type AttributeAmount = {
  type: "attribute";
  attribute: keyof Attributes;
  scale: number;
};

type FlatAmount = {
  type: "flat";
  amount: number;
};

type RandomAmount = {
  type: "random";
  min: number;
  max: number;
};

type LevelAmount = {
  type: "level";
  scale: number;
};

export enum Operation {
  Sum = "sum",
  Product = "product",
  Power = "power",
  Variance = "variance",
}

type Power = {
  type: Operation.Power;
  a: Amount;
  exponent: number;
};

type Sum = {
  type: Operation.Sum;
  amounts: Amount[];
};

type Product = {
  type: Operation.Product;
  amounts: Amount[];
};

type Variance = {
  type: "variance";
  base: Amount;
  variance: number;
};

export function resolveAmount(amount: Amount, context: Context): number {
  const { attributes, level } = context;

  switch (amount.type) {
    case "attribute": {
      return attributes[amount.attribute];
    }
    case "flat": {
      return amount.amount;
    }
    case "random": {
      const r = Math.random();
      return Math.floor(amount.min + (1 - r) + amount.max * r);
    }
    case "level": {
      return Math.floor(level * amount.scale);
    }
    case Operation.Product: {
      return amount.amounts
        .map((a) => resolveAmount(a, context))
        .reduce((acc, x) => acc * x, 1);
    }
    case Operation.Sum: {
      return amount.amounts
        .map((a) => resolveAmount(a, context))
        .reduce((acc, x) => acc + x, 0);
    }
    case Operation.Power: {
      return Math.pow(resolveAmount(amount.a, context), amount.exponent);
    }
    case "variance": {
      return (
        resolveAmount(amount.base, context) *
        Math.floor((0.5 - Math.random()) * amount.variance + 1)
      );
    }
    default:
      const _: never = amount;
      return 0;
  }
}

export type Amount =
  | Sum
  | Variance
  | Product
  | Power
  | LevelAmount
  | FlatAmount
  | RandomAmount
  | AttributeAmount;

export function sum(...amounts: Amount[]): Sum {
  return {
    type: Operation.Sum,
    amounts,
  };
}

export function product(...amounts: Amount[]): Product {
  return {
    type: Operation.Product,
    amounts,
  };
}

export function randomAmount(min: number, max: number): RandomAmount {
  return {
    type: "random",
    min,
    max,
  };
}

export function variance(amount: Amount, variance: number): Variance {
  return {
    type: "variance",
    base: amount,
    variance,
  };
}

export function amount(number: number): FlatAmount {
  return {
    type: "flat",
    amount: number,
  };
}

export function level(scale: number): LevelAmount {
  return {
    type: "level",
    scale,
  };
}

export function body(scale: number): AttributeAmount {
  return {
    type: "attribute",
    attribute: "body",
    scale,
  };
}

export function mind(scale: number): AttributeAmount {
  return {
    type: "attribute",
    attribute: "mind",
    scale,
  };
}

export function soul(scale: number): AttributeAmount {
  return {
    type: "attribute",
    attribute: "soul",
    scale,
  };
}
