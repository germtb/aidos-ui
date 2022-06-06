import React from "react";
import { createJSStyles } from "./Palette";
import { BaseView, BaseViewProps } from "./BaseView";

const jsStyles = createJSStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  smallSpacing: {
    paddingTop: "var(--spacing-s)",
    paddingBottom: "var(--spacing-s)",
    paddingLeft: "var(--spacing-s)",
    paddingRight: "var(--spacing-s)",
  },
  mediumSpacing: {
    paddingTop: "var(--spacing-m)",
    paddingBottom: "var(--spacing-m)",
    paddingLeft: "var(--spacing-m)",
    paddingRight: "var(--spacing-m)",
  },
  largeSpacing: {
    paddingTop: "var(--spacing-l)",
    paddingBottom: "var(--spacing-l)",
    paddingLeft: "var(--spacing-l)",
    paddingRight: "var(--spacing-l)",
  },
  vertical: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  horizontal: {
    paddingTop: 0,
    paddingBottom: 0,
  },
});

export type BoxSpacing = "small" | "medium" | "large";

export type Orientation = "none" | "vertical" | "horizontal";

export interface BoxProps extends BaseViewProps {
  spacing: BoxSpacing;
  orientation?: Orientation;
}

export function Box({
  jsStyle,
  componentName,
  spacing = "medium",
  orientation = "none",
  ...otherProps
}: BoxProps) {
  return (
    <BaseView
      componentName={(componentName ?? []).concat("Box")}
      jsStyle={[
        jsStyles.root,
        spacing === "small" && jsStyles.smallSpacing,
        spacing === "medium" && jsStyles.mediumSpacing,
        spacing === "large" && jsStyles.largeSpacing,
        orientation === "vertical" && jsStyles.vertical,
        orientation === "horizontal" && jsStyles.horizontal,
        jsStyle,
      ]}
      {...otherProps}
    />
  );
}
