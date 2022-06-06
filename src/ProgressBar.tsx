import React from "react";
import { createJSStyles, JSStyles } from "./Palette";
import { BaseView } from "./BaseView";

const jsStyles = createJSStyles({
  root: {
    width: "100%",
    height: 8,
    display: "flex",
    position: "relative",
    backgroundColor: "var(--primary-background)",
    borderRadius: "var(--border-radius-m)",
    border: "1px solid var(--highlight)",
    overflow: "hidden",
  },
  fill: {
    backgroundColor: "var(--highlight)",
    position: "absolute",
    transformOrigin: "center left",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  transition: {
    // transition: "transform 0.2s ease-in",
  },
});

export function ProgressBar({
  progress,
  jsStyle,
}: {
  progress: number;
  jsStyle?: JSStyles;
}) {
  return (
    <BaseView jsStyle={[jsStyles.root, jsStyle]}>
      <BaseView
        jsStyle={jsStyles.fill}
        style={{
          transform: `scaleX(${progress})`,
        }}
      />
    </BaseView>
  );
}
