import React, { ReactElement } from "react";
import { Vector } from "../core/Vector";
import { CELL } from "./Cell";

export const DropCell = ({
  position,
  name,
}: {
  position: Vector;
  name: string;
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
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        paddingTop: 4,
        paddingBottom: 4,
        transition: "transform ease-out 0.25s",
        willChange: "transform",
      }}
    >
      <div>{name}</div>
    </div>
  );
};
