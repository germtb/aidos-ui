import { Entity } from "./Entity";

export type Attribute = {
  entity: Entity.attribute;
  value: number;
};

export type Attributes = {
  might: Attribute;
  speed: Attribute;
  mind: Attribute;
};
