import { Entity } from "./Entity";
import { Physical } from "./Physical";
import { Skill } from "./Skill";

export type Drop = {
  drops: Readonly<Skill[]>;
  ID: string;
  entity: Entity.drop;
} & Physical;
