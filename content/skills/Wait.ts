import { NOTHING } from "../../core/Effect";
import { Tier } from "../../core/Tier";
import { ActiveSkill } from "../../core/Skill";
import { NONE } from "../../core/Target";

export const wait: ActiveSkill = {
  ID: "wait",
  name: "Wait",
  effect: NOTHING,
  targetMode: NONE,
  castTime: 1,
  cost: {
    type: "none",
  },
  type: "active",
};
