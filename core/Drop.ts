import { ActiveSkill } from "./Skill";

export type Drop = {
  drops: Readonly<ActiveSkill[]>;
  ID: string;
};
