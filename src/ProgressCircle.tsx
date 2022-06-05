import React from "react";
import { createClassNames, createJSStyles, JSStyles } from "./Palette";
import BaseView from "./BaseView";

const jsStyles = createJSStyles({
  root: {
    backgroundColor: "var(--secondary-background)",
    transform: "rotate(-90deg)",
    borderRadius: "50%",
  },
});

function ProgressCircle({
  progress,
  stroke = 4,
  outerRadius,
}: {
  progress: number;
  stroke?: number;
  outerRadius: number;
}) {
  // const normalizedRadius = outerRadius - stroke * 2;
  const circumference = outerRadius * 2 * Math.PI;
  const strokeDashoffset = progress * circumference - circumference;

  return (
    <svg
      className={createClassNames(jsStyles.root)}
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

export default ProgressCircle;
