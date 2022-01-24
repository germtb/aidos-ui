import { Character } from "./Character";
import { Entity } from "./Entity";
import { vector, Vector } from "./Vector";
import { World, Element } from "./World";

type BaseTarget = {
  entity: Entity.target;
};

type Range = 1 | 2 | 3;

export type NearestFoe = BaseTarget & {
  type: "nearestFoe";
  range: Range;
};

export type FurthestFoe = BaseTarget & {
  type: "furthestFoe";
  range: Range;
};

export type FoesInRange = BaseTarget & {
  type: "foesInRange";
  range: Range;
};

type Self = BaseTarget & {
  type: "self";
};

type FrontLine = BaseTarget & {
  type: "frontLine";
  length: number;
};

type Circle = BaseTarget & {
  type: "circle";
  range: Range;
  radius: Range;
  affects: "all" | "foes" | "allies";
};

export type Target =
  | NearestFoe
  | FurthestFoe
  | Self
  | Circle
  | FoesInRange
  | FrontLine;

const onlyCharacterReducer = (acc: Character[], x: Element | null) =>
  x?.entity === Entity.character ? [...acc, x] : acc;

function range1(
  position: Vector,
  world: World,
  includeCenter: boolean = false
): Character[] {
  const cMap = world.elements;
  const pMap = world.positions;

  return [
    includeCenter ? cMap[pMap[position.toString()]] : null,
    cMap[pMap[position.add(Vector.UP).toString()]],
    cMap[pMap[position.add(Vector.DOWN).toString()]],
    cMap[pMap[position.add(Vector.LEFT).toString()]],
    cMap[pMap[position.add(Vector.RIGHT).toString()]],
  ].reduce(onlyCharacterReducer, []);
}

function range2(
  position: Vector,
  world: World,
  includeCenter: boolean = false
): Character[] {
  const cMap = world.elements;
  const pMap = world.positions;

  return range1(position, world, includeCenter).concat(
    [
      cMap[pMap[position.add(vector(1, 1)).toString()]],
      cMap[pMap[position.add(vector(1, -1)).toString()]],
      cMap[pMap[position.add(vector(-1, 1)).toString()]],
      cMap[pMap[position.add(vector(-1, -1)).toString()]],

      cMap[pMap[position.add(vector(2, 0)).toString()]],
      cMap[pMap[position.add(vector(0, 2)).toString()]],
      cMap[pMap[position.add(vector(-2, 0)).toString()]],
      cMap[pMap[position.add(vector(0, -2)).toString()]],
    ].reduce(onlyCharacterReducer, [])
  );
}

function range3(
  position: Vector,
  world: World,
  includeCenter: boolean = false
): Character[] {
  const cMap = world.elements;
  const pMap = world.positions;

  return range2(position, world, includeCenter).concat(
    [
      cMap[pMap[position.add(vector(1, 2)).toString()]],
      cMap[pMap[position.add(vector(-1, 2)).toString()]],
      cMap[pMap[position.add(vector(1, -2)).toString()]],
      cMap[pMap[position.add(vector(-1, -2)).toString()]],

      cMap[pMap[position.add(vector(2, 1)).toString()]],
      cMap[pMap[position.add(vector(2, -1)).toString()]],
      cMap[pMap[position.add(vector(-2, 1)).toString()]],
      cMap[pMap[position.add(vector(-2, -1)).toString()]],

      cMap[pMap[position.add(vector(2, 2)).toString()]],
      cMap[pMap[position.add(vector(2, -2)).toString()]],
      cMap[pMap[position.add(vector(-2, 2)).toString()]],
      cMap[pMap[position.add(vector(-2, -2)).toString()]],

      cMap[pMap[position.add(vector(3, 0)).toString()]],
      cMap[pMap[position.add(vector(0, 3)).toString()]],
      cMap[pMap[position.add(vector(-3, 0)).toString()]],
      cMap[pMap[position.add(vector(0, -3)).toString()]],
    ].reduce(onlyCharacterReducer, [])
  );
}

function lineN(
  origin: Vector,
  direction: Vector,
  world: World,
  length: number
): Character[] {
  if (length < 0) {
    throw new Error("Invalid length for line targetting");
  }

  const targets: Character[] = [];

  for (let i = 0; i < length; i++) {
    const element =
      world.elements[
        world.positions[origin.add(direction.times(i)).toString()]
      ];

    if (element && element.entity === Entity.character) {
      targets.push(element);
    }
  }

  return targets;
}

function allInRange(
  position: Vector,
  range: Range,
  world: World,
  includeCenter: boolean = false
): Character[] {
  if (range === 1) {
    return range1(position, world, includeCenter);
  } else if (range === 2) {
    return range2(position, world, includeCenter);
  } else if (range === 3) {
    return range3(position, world, includeCenter);
  } else {
    throw new Error(`Invalid range: ${range}`);
  }
}

export function findTarget(
  targetMode: Target,
  actor: Character,
  world: World
): Character[] {
  switch (targetMode.type) {
    case "self": {
      return [actor];
    }
    case "foesInRange": {
      return allInRange(actor.position, targetMode.range, world).filter(
        (target) => target.faction !== actor.faction
      );
    }
    case "nearestFoe": {
      return allInRange(actor.position, targetMode.range, world)
        .filter((target) => target.faction !== actor.faction)
        .filter((_, index) => {
          return index === 0;
        });
    }
    case "furthestFoe": {
      return allInRange(actor.position, targetMode.range, world)
        .filter((target) => target.faction !== actor.faction)
        .filter((_, index, list) => {
          return index === list.length - 1;
        });
    }
    case "frontLine": {
      return lineN(actor.position, actor.direction, world, targetMode.length);
    }
    case "circle": {
      const circle = targetMode;
      const furthest = allInRange(actor.position, circle.range, world)
        .filter((target) => target.faction !== actor.faction)
        .filter((_, index, list) => {
          return index === list.length - 1;
        });

      if (furthest.length === 0) {
        return [];
      }

      return allInRange(
        furthest[0].position,
        targetMode.radius,
        world,
        true
      ).filter((target) => {
        if (circle.affects === "all") {
          return true;
        } else if (circle.affects === "allies") {
          return target.faction === actor.faction;
        } else if (circle.affects === "foes") {
          return target.faction !== actor.faction;
        }
      });
    }
    default: {
      throw new Error("Function not implemented.");
    }
  }
}
