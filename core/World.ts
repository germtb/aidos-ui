import { skillMap } from "../content/skills/SkillMap";
import { Archetype, Character } from "./Character";
import { Drop } from "./Drop";
import { Entity } from "./Entity";
import { guid } from "./guid";
import { Rectangle } from "./Rectangle";
import { Resource } from "./Resource";
import { Skill } from "./Skill";
import { addToReserve, getReserveSkills } from "./SkillLoop";
import { Time } from "./Time";
import { dispatch } from "./UIEvent";
import { Vector } from "./Vector";

export type Element = Character | Drop;

export type World = {
  elements: {
    [ID: string]: Element;
  };
  positions: {
    [vector: string]: string;
  };
  subscriptions: {
    [ID: string]: Array<() => void>;
  };
  time: Time;
  pieces: Rectangle[];
};

export function move(ID: string, vector: Vector, world: World): boolean {
  const character = world.elements[ID];

  if (!character) {
    throw new Error(
      `PhysicalObject with ID: '${ID}' missing in the given world: ${JSON.stringify(
        world,
        null,
        2
      )}`
    );
  }

  const newPosition = character.position.add(vector);

  if (
    world.pieces.every((rect) => {
      return !rect.contains(newPosition);
    })
  ) {
    character.direction = vector;
    return false;
  }

  const one = world.elements[ID];
  const other = world.elements[world.positions[newPosition.toString()]];

  const collision = one && other && collide(one, other, world);

  if (collision?.type === "block") {
    return false;
  } else if (collision?.type === "destroy") {
    destroy(other.ID, world);
  } else if (collision?.type === "push" && !move(other.ID, vector, world)) {
    return false;
  }

  delete world.positions[character.position.toString()];
  world.positions[newPosition.toString()] = ID;
  character.position = newPosition;
  character.direction = vector;
  dispatch({ type: "elementUpdate", ID });
  return true;
}

export function instantiateCharacter(
  archetype: Archetype,
  position: Vector,
  world: World,
  direction: Vector = Vector.UP,
  size = 1,
  ID = guid()
): Character {
  if (world.elements[ID]) {
    throw new Error(
      `Cannot instantiate archetype ID is already assigned: ${world.elements[ID]}`
    );
  } else if (world.positions[position.toString()]) {
    throw new Error(
      `Cannot instantiate archetype because tile is not empty: ${
        world.positions[position.toString()]
      }`
    );
  }

  const character: Character = {
    ID,
    xp: 0,
    attributePoints: 0,
    level: archetype.level,
    name: archetype.name,
    entity: Entity.character,
    attributes: archetype.attributes,
    resources: {
      health: new Resource(archetype.resources.health.max),
      stamina: new Resource(archetype.resources.stamina.max),
      mana: new Resource(archetype.resources.mana.max),
    },
    loop: {
      entity: Entity.skillLoop,
      skills: [
        ...archetype.loop.skills.map((s) => ({ skill: s, onLoop: true })),
        ...archetype.drops
          .map(({ chance, ID }) => {
            const passes = Math.random() * 100 <= chance;

            if (!passes) {
              return null;
            }

            const potencyRoll = Math.random();
            const potencyRange = skillMap[ID].potencyRange;

            const skill: Skill = {
              entity: Entity.skill,
              ID,
              xp: 0,
              potency:
                potencyRange[1] * potencyRoll +
                potencyRange[0] * (1 - potencyRoll),
            };

            return { skill, onLoop: false };
          })
          .filter((x) => x),
      ],
      capacity: archetype.loop.capacity,
      pointer: 0,
      cooldown: 0,
    },
    controller: archetype.controller,
    movements: [],
    effects: [],
    position,
    size,
    faction: archetype.faction,
    direction,
  };

  instantiate(character, world);

  return character;
}

export function instantiate(element: Element, world: World) {
  world.elements[element.ID] = element;
  world.subscriptions[element.ID] = [];
  world.positions[element.position.toString()] = element.ID;
}

function instantiateDrops(
  drops: Skill[],
  position: Vector,
  world: World,
  direction: Vector = Vector.UP,
  size = 1,
  ID = guid()
) {
  const drop: Drop = {
    entity: Entity.drop,
    ID,
    drops,
    size,
    position,
    direction,
  };

  instantiate(drop, world);

  return drop;
}

export function destroy(ID: string, world: World): void {
  const element = world.elements[ID];

  delete world.positions[world.elements[ID].position.toString()];
  world.subscriptions[ID].forEach((unsubscribe) => unsubscribe());
  delete world.elements[ID];

  if (
    element.entity === Entity.character &&
    getReserveSkills(element.loop).length > 0
  ) {
    const drops = getReserveSkills(element.loop);
    instantiateDrops(drops, element.position, world);
  }
}

type Collision =
  | {
      type: "block";
    }
  | {
      type: "push";
    }
  | {
      type: "destroy";
    };

function collide(one: Element, other: Element, world: World): Collision {
  if (one.entity === Entity.character && other.entity === Entity.character) {
    return { type: "block" };
  }

  if (one.entity === Entity.drop) {
    return { type: "block" };
  }

  if (one.entity === Entity.character && other.entity === Entity.drop) {
    const character: Character = one;
    const drop: Drop = other;

    addToReserve(character.loop, drop.drops);
    return { type: "destroy" };
  }

  return { type: "block" };
}
