import { Character } from "./Character";
import { Entity } from "./Entity";
import { Resources } from "./Resource";
import { Tuple1to8 } from "./Tuples";
import { dispatch } from "./UIEvent";
import { Vector } from "./Vector";
import { move, World } from "./World";

type BaseEffect = {
  entity: Entity.effect;
};

type ActiveEffect = BaseEffect & {
  passive: false;
};

type PasiveEffect = BaseEffect & {
  passive: true;
  duration: number;
};

type Nothing = ActiveEffect & {
  type: "nothing";
};

type Exhausted = ActiveEffect & {
  type: "exhausted";
};

type Hurt = ActiveEffect & {
  type: "hurt";
};

type Stressed = ActiveEffect & {
  type: "stressed";
};

type Move = ActiveEffect & {
  type: "move";
  move: Vector;
};

type Regen = PasiveEffect & {
  type: "regen";
  resource: keyof Resources;
  amount: number;
};

type AddResource = ActiveEffect & {
  type: "addResource";
  resource: keyof Resources;
  amount: number;
};

type IncreaseResource = ActiveEffect & {
  type: "increaseResource";
  resource: keyof Resources;
  amount: number;
};

export type Effect =
  | Nothing
  | AddResource
  | IncreaseResource
  | Move
  | Regen
  | Exhausted
  | Hurt
  | Stressed;

export function runEffects(character: Character, world: World) {
  if (character.effects.length === 0) {
    return;
  }

  const effects: Effect[] = [
    ...character.effects.reduce(
      (acc: Effect[], e: Effect) => acc.concat(e),
      []
    ),
  ];

  const exhausted = effects.some((e: Effect) => e.type === "exhausted");
  const hurt = effects.some((e: Effect) => e.type === "hurt");
  const stressed = effects.some((e: Effect) => e.type === "stressed");

  const state = {
    addResource: {
      health: hurt ? 0 : character.attributes.might.value / 10,
      stamina: exhausted ? 0 : character.attributes.speed.value,
      mana: stressed ? 0 : character.attributes.mind.value / 10,
    },
    increaseResource: {
      health: 0,
      stamina: 0,
      mana: 0,
    },
    moves: [],
  };

  for (const effect of effects) {
    switch (effect.type) {
      case "nothing":
        continue;
      case "addResource": {
        state.addResource[effect.resource] += effect.amount;
        continue;
      }
      case "increaseResource": {
        state.increaseResource[effect.resource] += effect.amount;
        continue;
      }
      case "move": {
        state.moves.push(effect.move);
        continue;
      }
      case "regen": {
        state.addResource[effect.resource] += effect.amount;
        continue;
      }
      case "hurt":
      case "stressed":
      case "exhausted": {
        continue;
      }
      default: {
        throw new Error(
          // @ts-expect-error
          `Effect of type ${effect.type} does not have an implementation`
        );
      }
    }
  }

  Object.keys(character.resources).forEach((resourceName: keyof Resources) => {
    const resource = character.resources[resourceName];
    resource.add(state.addResource[resourceName]);
    resource.increaseMax(state.increaseResource[resourceName]);
  });

  for (const vector of state.moves) {
    if (!move(character.ID, vector, world)) {
      break;
    }
  }

  character.effects = [];
  dispatch({ type: "elementUpdate", ID: character.ID });
}
