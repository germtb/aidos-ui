import { ActiveSkill, Skill } from "./Skill";

export type SkillLoopCell = {
  skill: ActiveSkill;
  onLoop: boolean;
};

export type SkillLoop = {
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
  loop.skills.splice(j, 1);
}

export function addToReserve(loop: SkillLoop, skills: Readonly<Skill[]>) {
  loop.skills.push(...skills.map((skill) => ({ skill, onLoop: false })));
}
