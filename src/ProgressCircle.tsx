import React from "react";
import { cssVar, jss } from "./jss";

export function ProgressCircle({
  progress,
  stroke = 4,
  outerRadius,
}: {
  progress: number;
  stroke?: number;
  outerRadius: number;
}) {
  const circumference = outerRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <svg
      className={jss({
        backgroundColor: cssVar("--secondary-background"),
        transform: "rotate(-90deg)",
        borderRadius: "50%",
      })}
      width={(outerRadius + stroke) * 2}
      height={(outerRadius + stroke) * 2}
    >
      <circle
        stroke="var(--highlight)"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={`${circumference} ${circumference}`}
        style={{ strokeDashoffset }}
        r={outerRadius}
        cx={outerRadius + stroke}
        cy={outerRadius + stroke}
      />
    </svg>
  );
}
