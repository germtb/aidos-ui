import React from "react";
import { createJSStyles } from "./Palette";
import BaseView, { BaseViewProps } from "./BaseView";

const jsStyles = createJSStyles({
  root: {
    display: "flex",
    flexDirection: "column",
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

export type ColumnSpacing = "none" | "small" | "medium" | "large";

interface ColumnProps extends BaseViewProps {
  spacing?: ColumnSpacing;
}

function Column(
  { jsStyle, spacing = "none", ...otherProps }: ColumnProps,
  ref?: React.Ref<HTMLDivElement>
) {
  return (
    <BaseView
      ref={ref}
      componentName={otherProps.componentName ?? "Column"}
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

export default React.forwardRef(Column);
