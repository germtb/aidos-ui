import React from "react";

import { BaseView } from "./BaseView";
import { Color, JSS, cssVar, getBackground } from "./jss";

export type ProgressBarSize = "small" | "medium";

export interface ProgressBarProps {
  progress: number;
  color?: Color;
  size?: ProgressBarSize;
  jss?: JSS;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

const styles: { [key: string]: JSS } = {
  root: {
    width: "100%",
    position: "relative",
    backgroundColor: cssVar("--secondary-background"),
    borderRadius: 999,
    overflow: "hidden",
  },
  fill: {
    borderRadius: "inherit",
    position: "absolute",
    transformOrigin: "center left",
    transition: `transform ${cssVar("--transition-normal")}`,
    inset: 0,
    ":dir(rtl)": {
      transformOrigin: "center right",
    },
    "@media (prefers-reduced-motion: reduce)": {
      transition: "none",
    },
  },
};

const sizes: { [size in ProgressBarSize]: number } = {
  small: 4,
  medium: 8,
};

export function ProgressBar({
  color = "highlight",
  progress,
  size = "medium",
  jss,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
}: ProgressBarProps) {
  const value = Number.isFinite(progress)
    ? Math.min(1, Math.max(0, progress))
    : 0;

  return (
    <BaseView
      role="progressbar"
      aria-label={ariaLabelledby ? undefined : (ariaLabel ?? "Progress")}
      aria-labelledby={ariaLabelledby}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value * 100)}
      jss={[styles.root, { height: sizes[size] }, jss]}
    >
      <BaseView
        jss={[styles.fill, getBackground(color)]}
        style={{ transform: `scaleX(${value})` }}
      />
    </BaseView>
  );
}
