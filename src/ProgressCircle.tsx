import React from "react";

import { Color, JSS, cssVar, getColorValue, toClassnames } from "./jss";

export type ProgressCircleSize = "small" | "medium";

export interface ProgressCircleProps {
  progress: number;
  color?: Color;
  size?: ProgressCircleSize;
  jss?: JSS;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

const styles: { [key: string]: JSS } = {
  root: {
    display: "block",
  },
  track: {
    fill: "none",
    stroke: cssVar("--secondary-background"),
  },
  fill: {
    fill: "none",
    transform: "rotate(-90deg)",
    transformOrigin: "50% 50%",
    transition: `stroke-dashoffset ${cssVar("--transition-normal")}`,
    "@media (prefers-reduced-motion: reduce)": {
      transition: "none",
    },
  },
};

const sizes: {
  [size in ProgressCircleSize]: { diameter: number; stroke: number };
} = {
  small: { diameter: 16, stroke: 2 },
  medium: { diameter: 32, stroke: 4 },
};

export function ProgressCircle({
  progress,
  color = "highlight",
  size = "medium",
  jss,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
}: ProgressCircleProps) {
  const value = Number.isFinite(progress)
    ? Math.min(1, Math.max(0, progress))
    : 0;
  const { diameter, stroke } = sizes[size];
  const radius = (diameter - stroke) / 2;
  const center = diameter / 2;
  const circumference = radius * 2 * Math.PI;

  return (
    <svg
      role="progressbar"
      aria-label={ariaLabelledby ? undefined : (ariaLabel ?? "Progress")}
      aria-labelledby={ariaLabelledby}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value * 100)}
      className={toClassnames([styles.root, jss])}
      width={diameter}
      height={diameter}
      viewBox={`0 0 ${diameter} ${diameter}`}
    >
      <circle
        className={toClassnames(styles.track)}
        strokeWidth={stroke}
        r={radius}
        cx={center}
        cy={center}
      />
      <circle
        className={toClassnames(styles.fill)}
        stroke={getColorValue(color)}
        strokeWidth={stroke}
        strokeLinecap={value === 0 ? "butt" : "round"}
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - value)}
        r={radius}
        cx={center}
        cy={center}
      />
    </svg>
  );
}
