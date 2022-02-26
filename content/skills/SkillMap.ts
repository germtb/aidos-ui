import { ActiveSkillDefinition, ActiveSkillType } from "../../core/Skill";

import { fireball } from "./Fireball";
import { wait } from "./Wait";
import { strike } from "./Strike";
import { bodySlam } from "./BodySlam";
import { magicMissile } from "./MagicMissile";
import { doubleStrike } from "./DoubleStrike";

export const skillMap: {
  [key in ActiveSkillType]: ActiveSkillDefinition;
} = {
  fireball,
  wait,
  bodySlam,
  strike,
  magicMissile,
  doubleStrike,
};
