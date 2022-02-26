import { Skill } from "./Skill";

export type Drop = {
  drops: Readonly<Skill[]>;
  ID: string;
};
