import React from "react";
import { ComponentName } from "./BaseView";
import {
  JSStyles,
  createClassNames,
  createJSStyles,
  Padding,
  getPadding,
} from "./Palette";

export type ButtonColor = "positive" | "secondary" | "negative";

export interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  componentName?: ComponentName;
  onPress: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  jsStyle?: JSStyles;
  color: ButtonColor;
  bare?: boolean;
  className?: undefined;
  animateClick?: boolean;
  padding?: Padding;
}

const jsStyles = createJSStyles({
  root: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    transition: "opacity 0.1s ease-in",
    outlineColor: "var(--outline)",
    ":disabled": {
      color: "var(--secondary-text)",
      backgroundColor: "var(--background-button-secondary)",
    },
    ":focus-visible": {
      outlineWidth: "2px",
      outlineStyle: "solid",
      outlineOffset: -2,
    },
  },
  animateClick: {
    position: "relative",
    ":active": {
      opacity: 0.95,
      top: 1,
    },
    ":active:disabled": {
      top: 0,
      opacity: 1,
    },
  },
  positive: {
    backgroundColor: "var(--background-button-positive)",
    ":disabled": {
      backgroundColor: "var(--background-button-disabled)",
    },
  },
  secondary: {
    backgroundColor: "var(--background-button-secondary)",
    ":disabled": {
      backgroundColor: "var(--background-button-disabled)",
    },
  },
  negative: {
    backgroundColor: "var(--background-button-negative)",
    ":disabled": {
      backgroundColor: "var(--background-button-disabled)",
    },
  },
  disabled: {
    cursor: "default",
  },
  bare: {
    backgroundColor: "inherit",
    outlineColor: "var(--outline)",
    ":disabled": {
      backgroundColor: "inherit",
    },
  },
  bareDisabled: {
    backgroundColor: "inherit",
  },
  opacityHover: {
    ":hover": {
      opacity: 0.8,
    },
  },
  colorHover: {
    ":hover": {
      backgroundColor: "var(--secondary-background)",
    },
  },
});

export const BaseButton = React.forwardRef(
  (
    {
      componentName,
      onPress,
      children,
      jsStyle,
      color,
      bare = false,
      disabled,
      animateClick = true,
      padding,
      ...otherProps
    }: BaseButtonProps,
    ref?: React.Ref<HTMLButtonElement>
  ) => {
    return (
      <button
        {...otherProps}
        data-test-id={componentName ?? "BaseButton"}
        aria-disabled={disabled ? true : undefined}
        // disabled={disabled ? true : undefined}
        ref={ref}
        onClick={(event) => {
          if (disabled) {
            return;
          }

          onPress(event);
        }}
        className={createClassNames(
          jsStyles.root,
          color === "positive" && !disabled && jsStyles.positive,
          color === "secondary" && !disabled && jsStyles.secondary,
          color === "negative" && !disabled && jsStyles.negative,
          bare && jsStyles.bare,
          disabled && jsStyles.disabled,
          bare && !disabled && jsStyles.colorHover,
          !bare && !disabled && jsStyles.opacityHover,
          animateClick && !disabled && jsStyles.animateClick,
          jsStyle,
          getPadding(padding)
        )}
      >
        {children}
      </button>
    );
  }
);
