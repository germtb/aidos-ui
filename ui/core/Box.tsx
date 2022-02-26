import React from "react";
import { createJSStyles } from "./Palette";
import BaseView, { BaseViewProps } from "./BaseView";

const jsStyles = createJSStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  smallSpacing: {
    padding: "var(--spacing-s)",
  },
  mediumSpacing: {
    padding: "var(--spacing-m)",
  },
  largeSpacing: {
    padding: "var(--spacing-l)",
  },
});

export type BoxSpacing = "small" | "medium" | "large";

export interface BoxProps extends BaseViewProps {
  spacing: BoxSpacing;
}

export default function Box({
  jsStyle,
  componentName,
  spacing = "medium",
  ...otherProps
}: BoxProps) {
  return (
    <BaseView
      componentName={componentName ?? "Box"}
      jsStyle={[
        jsStyles.root,
        spacing === "small" && jsStyles.smallSpacing,
        spacing === "medium" && jsStyles.mediumSpacing,
        spacing === "large" && jsStyles.largeSpacing,
        jsStyle,
      ]}
      {...otherProps}
    />
  );
}
