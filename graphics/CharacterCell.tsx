import React, { ReactElement } from "react";
import { Vector } from "../core/Vector";
import { Bar } from "./Bar";
import { CELL } from "./Cell";

export const CharacterCell = ({
  position,
  name,
  healthRatio,
}: {
  position: Vector;
  name: string;
  healthRatio: number;
}): ReactElement => {
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        left: 0,
        bottom: 0,
        transform: `translate(${position.x * CELL}px, ${-position.y * CELL}px)`,
        width: CELL,
        height: CELL,
        justifyContent: "space-between",
        alignItems: "stretch",
        textAlign: "center",
        paddingTop: 4,
        paddingBottom: 4,
        transition: "transform ease-out 0.25s",
        willChange: "transform",
      }}
    >
      <div>{name}</div>
      <div
        style={{
          marginRight: 4,
          marginLeft: 4,
          height: 4,
        }}
      >
        <Bar ratio={healthRatio} />
      </div>
    </div>
  );
};
