import { NOTHING } from "../../core/Effect";
import { Essence, Tier } from "../../core/Essence";
import { ActiveSkillDefinition, ActiveSkillType } from "../../core/Skill";
import { NONE } from "../../core/Target";

export const wait: ActiveSkillDefinition = {
  ID: ActiveSkillType.wait,
  name: "Wait",
  effect: NOTHING,
  targetMode: NONE,
  castTime: 1,
  essence: Essence.Might,
  tier: Tier.F,
  cost: {
    type: "none",
  },
};
