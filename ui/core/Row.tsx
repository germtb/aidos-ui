import React from "react";
import { createJSStyles } from "./Palette";
import BaseView, { BaseViewProps } from "./BaseView";

const jsStyles = createJSStyles({
  root: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
  },
  smallSpacing: {
    // @ts-ignore
    " > * + *": {
      marginLeft: "var(--spacing-s)",
    },
  },
  mediumSpacing: {
    // @ts-ignore
    " > * + *": {
      marginLeft: "var(--spacing-m)",
    },
  },
  largeSpacing: {
    // @ts-ignore
    " > * + *": {
      marginLeft: "var(--spacing-l)",
    },
  },
});

export type RowSpacing = "none" | "small" | "medium" | "large";

interface RowProps extends BaseViewProps {
  spacing?: RowSpacing;
}

export default function Row({
  jsStyle,
  spacing = "none",
  ...otherProps
}: RowProps) {
  return (
    <BaseView
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
