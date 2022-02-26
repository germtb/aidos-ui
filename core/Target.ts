import { Character } from "./entities/Character";
import { World } from "./World";

type Range = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type NearestFoe = {
  type: "nearestFoe";
  range: Range;
};

export type FurthestFoe = {
  type: "furthestFoe";
  range: Range;
};

export type FoesInRange = {
  type: "foesInRange";
  range: Range;
};

type None = {
  type: "none";
};

type Self = {
  type: "self";
};

export const SELF: Self = {
  type: "self",
};

export const NONE: None = {
  type: "none",
};

export type Target = NearestFoe | FurthestFoe | FoesInRange | Self | None;

// function allInRange(
//   range: Range,
//   world: World,
//   includeCenter: boolean = false
// ): Character[] {
//   if (range === 1) {
//     return range1(position, world, includeCenter);
//   } else if (range === 2) {
//     return range2(position, world, includeCenter);
//   } else if (range === 3) {
//     return range3(position, world, includeCenter);
//   } else {
//     throw new Error(`Invalid range: ${range}`);
//   }
// }

export function findTarget(
  targetMode: Target,
  actor: Character,
  world: World
): Character[] {
  return [];
  // switch (targetMode.type) {
  //   case "self": {
  //     return [actor];
  //   }
  //   case "foesInRange": {
  //     return allInRange(actor.position, targetMode.range, world).filter(
  //       (target) => target.faction !== actor.faction
  //     );
  //   }
  //   case "nearestFoe": {
  //     return allInRange(actor.position, targetMode.range, world)
  //       .filter((target) => target.faction !== actor.faction)
  //       .filter((_, index) => {
  //         return index === 0;
  //       });
  //   }
  //   case "furthestFoe": {
  //     return allInRange(actor.position, targetMode.range, world)
  //       .filter((target) => target.faction !== actor.faction)
  //       .filter((_, index, list) => {
  //         return index === list.length - 1;
  //       });
  //   }
  //   case "frontLine": {
  //     return lineN(actor.position, actor.direction, world, targetMode.length);
  //   }
  //   case "circle": {
  //     const circle = targetMode;
  //     const furthest = allInRange(actor.position, circle.range, world)
  //       .filter((target) => target.faction !== actor.faction)
  //       .filter((_, index, list) => {
  //         return index === list.length - 1;
  //       });

  //     if (furthest.length === 0) {
  //       return [];
  //     }

  //     return allInRange(
  //       furthest[0].position,
  //       targetMode.radius,
  //       world,
  //       true
  //     ).filter((target) => {
  //       if (circle.affects === "all") {
  //         return true;
  //       } else if (circle.affects === "allies") {
  //         return target.faction === actor.faction;
  //       } else if (circle.affects === "foes") {
  //         return target.faction !== actor.faction;
  //       }
  //     });
  //   }
  //   default: {
  //     throw new Error("Function not implemented.");
  //   }
  // }
}
