import { Attributes, SecondaryStats } from "./components/Stats";
import { Skill } from "./Skill";

export type Context = {
  attributes: Attributes;
  stats: SecondaryStats;
  level: number;
  skills: Array<Skill>;
};
