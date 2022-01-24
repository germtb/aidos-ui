import React, { ReactElement } from "react";
import { CELL } from "./Cell";

export const Grid = React.memo(
  ({ width, height }: { width: number; height: number }): ReactElement => {
    return (
      <div
        style={{
          position: "relative",
          height: CELL * height,
          width: CELL * width,
          backgroundSize: `${CELL * width}px ${CELL * height}px`,
          backgroundImage: `radial-gradient(circle, #000000 1px, rgba(0, 0, 0, 0) 1px)`,
        }}
      />
    );
  }
);
