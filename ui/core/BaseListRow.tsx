import React from "react";
import { createClassNames, JSStyles, createJSStyles } from "./Palette";
import ListDivider from "./ListDivider";

export interface BaseListRowProps
  extends React.LiHTMLAttributes<HTMLLIElement> {
  spacing?: BaseListRowSpacing;
  jsStyle?: JSStyles;
  indentation?: BaseListIndentation;
  background?: BaseListRowBackground;
  withDivider?: boolean;
  className?: undefined;
  role?: undefined;
  componentName?: string;
}

const jsStyles = createJSStyles({
  root: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    overflowX: "auto",
  },
  spacingSmall: {
    paddingTop: "var(--spacing-s)",
    paddingBottom: "var(--spacing-s)",
  },
  spacingMedium: {
    paddingTop: "var(--spacing-m)",
    paddingBottom: "var(--spacing-m)",
  },
  spacingLarge: {
    paddingTop: "var(--spacing-l)",
    paddingBottom: "var(--spacing-l)",
  },
  indentationMedium: {
    paddingLeft: "var(--spacing-m)",
  },
  backgroundPrimary: {
    backgroundColor: "var(--primary-background)",
  },
  backgroundSecondary: {
    backgroundColor: "var(--secondary-background)",
  },
});

export type BaseListRowSpacing = "none" | "small" | "medium" | "large";

export type BaseListIndentation = "none" | "medium";

export type BaseListRowBackground = "primary" | "secondary";

function BaseListRow(
  {
    componentName,
    children,
    spacing,
    jsStyle,
    withDivider = true,
    indentation,
    background = "primary",
    ...otherProps
  }: BaseListRowProps,
  ref?: React.Ref<HTMLLIElement>
) {
  return (
    <>
      <li
        {...otherProps}
        ref={ref}
        data-test-id={componentName ?? "BaseListRow"}
        // role="row" TODO why is this the wrong aria?
        className={createClassNames(
          jsStyles.root,
          background === "primary" && jsStyles.backgroundPrimary,
          background === "secondary" && jsStyles.backgroundSecondary,
          spacing === "small" && jsStyles.spacingSmall,
          spacing === "medium" && jsStyles.spacingMedium,
          spacing === "large" && jsStyles.spacingLarge,
          indentation === "medium" && jsStyles.indentationMedium,
          jsStyle
        )}
      >
        {children}
      </li>
      {withDivider && <ListDivider />}
    </>
  );
}

export default React.forwardRef(BaseListRow);
