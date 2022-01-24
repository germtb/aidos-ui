import { Character } from "../../core/Character";
import { Entity } from "../../core/Entity";
import { Archetype, Essence, SkillType, Tier } from "../../core/Skill";
import { findTarget } from "../../core/Target";
import { World } from "../../core/World";

export const seek: Archetype = {
  ID: SkillType.seek,
  name: "Seek",
  effect: ({
    potency,
    character,
    world,
  }: {
    potency: number;
    character: Character;
    world: World;
  }) => {
    const nearestFoe = findTarget(
      {
        entity: Entity.target,
        type: "nearestFoe",
        range: 3,
      },
      character,
      world
    )[0];

    if (nearestFoe && nearestFoe.position.distance(character.position) > 1) {
      return [
        {
          entity: Entity.effect,
          type: "move",
          move: nearestFoe.position
            .substract(character.position)
            .direction()
            .times(potency),
          passive: false,
        },
      ];
    } else {
      return [
        {
          entity: Entity.effect,
          type: "nothing",
          passive: false,
        },
      ];
    }
  },
  targetMode: {
    entity: Entity.target,
    type: "self",
  },
  cooldown: 0,
  essence: Essence.Might,
  tier: Tier.F,
  potencyRange: [1, 3],
  cost: {
    type: "none",
  },
};
