import { Archetype, SkillType } from "../../core/Skill";

import { basicAttack } from "./BasicAttack";
import { fireball } from "./Fireball";
import { seek } from "./Seek";
import { basicHeal } from "./BasicHeal";
import { wait } from "./Wait";

export const skillMap: {
  [key in SkillType]: Archetype;
} = {
  basicAttack,
  fireball,
  basicHeal,
  wait,
  seek,
};
