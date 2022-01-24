import { Character } from "./Character";
import { Entity } from "./Entity";
import { Resources } from "./Resource";
import { Tuple1to8 } from "./Tuples";
import { Vector } from "./Vector";
import { move, World } from "./World";

type BaseMovement = {};

type Nothing = BaseMovement & {
  type: "nothing";
};

type Move = BaseMovement & {
  type: "move";
  move: Vector;
};

export type Movement = Nothing | Move;

export function runMovements(character: Character, world: World) {
  const movements = [
    ...character.movements.reduce(
      (acc: Movement[], e: Movement) => acc.concat(e),
      []
    ),
  ];

  const state = {
    moves: [],
  };

  for (const movement of movements) {
    switch (movement.type) {
      case "nothing":
        continue;
      case "move": {
        state.moves.push(movement.move);
        continue;
      }
      default: {
        throw new Error(
          // @ts-expect-error
          `Movement of type ${movement.type} does not have an implementation`
        );
      }
    }
  }

  for (const vector of state.moves) {
    if (!move(character.ID, vector, world)) {
      break;
    }
  }

  character.movements = [];
}
