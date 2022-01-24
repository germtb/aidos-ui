import React from "react";
import { Rectangle as RectangleType } from "../core/Rectangle";
import { CELL } from "./Cell";

export const Rectangle = ({ rect }: { rect: RectangleType }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: rect.origin.x * CELL,
        bottom: rect.origin.y * CELL,
        height: CELL * rect.height,
        width: CELL * rect.width,
        backgroundImage: `
          repeating-linear-gradient(to right, transparent 0 47px, #ccc 48px),
          repeating-linear-gradient(to bottom, transparent, transparent 47px, #ccc 48px),
          linear-gradient(to right, #ccc, transparent 1px, transparent 100%),
          linear-gradient(to bottom, #ccc, transparent 1px, transparent 100%)
        `,
      }}
    />
  );
};

// linear-gradient(to right, grey 1px, transparent 1px), linear-gradient(to bottom, grey 1px, transparent 1px)
