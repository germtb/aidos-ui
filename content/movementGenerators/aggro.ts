import { Character } from "../../core/Character";
import { MovementGenerator } from "../../core/Controller";
import { World } from "../../core/World";
import { HERO } from "../../debug";

export const aggro: ({ range }: { range: number }) => MovementGenerator = ({
  range,
}) => ({ character, world }: { character: Character; world: World }) => {
  const hero = world.elements[HERO];
  const d = hero ? hero.position.distance(character.position) : Infinity;

  if (d > 1 && d < range) {
    return [
      {
        type: "move",
        move: hero.position.substract(character.position).direction(),
      },
    ];
  } else {
    return [
      {
        type: "nothing",
      },
    ];
  }
};
