import { skillMap } from "../content/skills/SkillMap";
import { get } from "../utils/get";
import { Character } from "./Character";
import { Entity } from "./Entity";
import { ActiveSkill, addXP, Skill, toXP, tryActivateSkill } from "./Skill";
import { Tuple1to8 } from "./Tuples";
import { World } from "./World";

export type SkillLoopCell = {
  skill: ActiveSkill;
  onLoop: boolean;
};

export type SkillLoop = {
  entity: Entity.skillLoop;
  skills: Array<SkillLoopCell>;
  capacity: number;
  pointer: number; // Points to the skill that should be used next
  cooldown: number;
};

export function getLoopSkills(loop: SkillLoop) {
  return loop.skills.filter((s) => s.onLoop).map((x) => x.skill);
}

export function getReserveSkills(loop: SkillLoop) {
  return loop.skills.filter((s) => !s.onLoop).map((x) => x.skill);
}

export function runSkillLoopFrame(character: Character, world: World) {
  const loop = character.loop;
  const loopSkills = getLoopSkills(loop);
  loop.cooldown = loop.cooldown === 0 ? 0 : loop.cooldown - 1;

  if (loop.cooldown > 0) {
    return;
  }

  if (loop.pointer >= loopSkills.length) {
    loop.pointer = 0;
    return;
  }

  const skill = loopSkills[character.loop.pointer];

  const skillArchetype = skillMap[skill.ID];

  if (tryActivateSkill(skill, character, world)) {
    loop.cooldown = skillArchetype.cooldown;
    loop.pointer += 1;
  }
}

export function assignSkillToLoop(loop: SkillLoop, index: number) {
  const skillsInLoop = loop.skills.reduce(
    (acc, { onLoop }) => acc + (onLoop ? 1 : 0),
    0
  );

  if (skillsInLoop > loop.capacity) {
    return;
  }

  loop.skills[index].onLoop = true;
}

export function removeSkillFromLoop(loop: SkillLoop, index: number) {
  loop.skills[index].onLoop = false;
}

export function mergeSkill(i: number, j: number, loop: SkillLoop) {
  const skill1 = loop.skills[i].skill;
  const skill2 = loop.skills[j].skill;

  const xp = toXP(skill2);
  addXP(skill1, xp);
  loop.skills.splice(j, 1);
}

export function addToReserve(loop: SkillLoop, skills: Readonly<Skill[]>) {
  loop.skills.push(...skills.map((skill) => ({ skill, onLoop: false })));
}
