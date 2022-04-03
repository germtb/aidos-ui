import { ActiveSkill, PassiveSkill } from "./Skill";

export type Upgrade = {
  skill: PassiveSkill | ActiveSkill;
  next: Array<Upgrade>;
  fragments: Array<Fragment>;
};

export type Fragment = {
  upgrade: Upgrade,
  progress: number,
  amount: number,
}
