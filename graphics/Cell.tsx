import React from "react";
import { skillMap } from "../content/skills/SkillMap";
import { Entity } from "../core/Entity";
import { Element } from "../core/World";
import { CharacterCell } from "./CharacterCell";
import { DropCell } from "./DropCell";

export const CELL = 48;

export const Cell = ({ element }: { element: Element }) => {
  switch (element.entity) {
    case Entity.drop: {
      return (
        <div>TODO</div>
        // <DropCell
        //   name={skillMap[element.drops.ID].name}
        //   position={element.position}
        // />
      );
    }
    case Entity.character: {
      return (
        <CharacterCell
          name={element.name}
          position={element.position}
          healthRatio={
            element.resources.health.value / element.resources.health.max
          }
        />
      );
    }
  }
};
