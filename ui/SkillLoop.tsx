import React, { ReactElement, useMemo, useRef } from "react";
import { skillMap } from "../content/skills/SkillMap";
import {
  getLoopSkills,
  SkillLoop as SkillLoopType,
  SkillLoopCell,
} from "../core/SkillLoop";

const CELL = 48;

export const SkillLoop = ({ loop }: { loop: SkillLoopType }): ReactElement => {
  const loopSkills = getLoopSkills(loop);
  const lastSkill = loopSkills[loopSkills.length - 1];
  const lastSkillArchetype = lastSkill ? skillMap[lastSkill.ID] : null;
  const leftRef = useRef(-1);

  const left = lastSkill
    ? (Math.min(loop.pointer, loop.capacity) +
        (1 - loop.cooldown) / lastSkillArchetype.castTime) *
      CELL
    : 0;

  const shouldAnimate = left >= leftRef.current;

  leftRef.current = left;

  const cells: Array<SkillLoopCell> = [];

  for (let i = 0; i < loop.capacity; i++) {
    cells.push(loop.skills[i]);
  }

  const bar = useMemo(
    () => (
      <div
        style={{
          position: "absolute",
          width: 1,
          height: CELL,
          left,
          background: "black",
          transition: shouldAnimate ? `left, linear, 0.5s` : null,
        }}
      />
    ),
    [left, shouldAnimate]
  );

  return (
    <div style={{ position: "relative", display: "flex" }} id="loop">
      {cells.map((cell, i) => {
        if (cell == null) {
          return (
            <div
              style={{
                width: CELL,
                height: CELL,
                borderTop: "1px solid black",
                borderBottom: "1px solid black",
                borderRight: "1px solid black",
                borderLeft: i === 0 ? "1px solid black" : undefined,
                boxSizing: "border-box",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
              key={i}
            />
          );
        }

        const { skill } = cell;

        return (
          <div
            style={{
              width: CELL,
              height: CELL,
              borderTop: "1px solid black",
              borderBottom: "1px solid black",
              borderRight: "1px solid black",
              borderLeft: i === 0 ? "1px solid black" : undefined,
              boxSizing: "border-box",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
            key={i}
          >
            {skill ? skillMap[skill.ID].name : null}
          </div>
        );
      })}
      {bar}
    </div>
  );
};
