import { Character } from "./Character";
import { Movement } from "./Movement";
import { World } from "./World";

export type MovementGenerator = ({
  character: Character,
  world: World,
}) => Array<Movement>;

export type Controller = Array<MovementGenerator>;

export function runControllerFrame(character: Character, world: World) {
  const controller = character.controller;

  for (const movementGenerator of controller) {
    const movements = movementGenerator({ character, world });

    if (movements.length > 0) {
      character.movements.push(...movements);
      break;
    }
  }
}

export function addMovementGenerator(
  character: Character,
  movementGenerator: MovementGenerator
) {
  character.controller.push(movementGenerator);
}

export function removeMovementGenerator(character: Character, index: number) {
  character.controller = character.controller.filter((_, i) => i !== index);
}
