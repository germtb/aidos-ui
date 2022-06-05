import React from "react";
import { ComponentName } from "./BaseView";
import { JSStyles, createClassNames, createJSStyles } from "./Palette";

export type ButtonColor = "positive" | "secondary" | "negative";

export interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  componentName?: ComponentName;
  onPress: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  jsStyle?: JSStyles;
  color: ButtonColor;
  bare?: boolean;
  className?: undefined;
}

const jsStyles = createJSStyles({
  root: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    border: "none",
    transition: "opacity 0.1s ease-in",
    outlineColor: "var(--outline)",
    ":active": {
      // opacity: 0.9,
      transform: "scale(0.975)",
    },
    ":active:disabled": {
      opacity: 1,
      transform: "none",
    },
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
  positive: {
    backgroundColor: "var(--background-button-positive)",
  },
  secondary: {
    backgroundColor: "var(--background-button-secondary)",
  },
  negative: {
    backgroundColor: "var(--background-button-negative)",
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
  opacityHover: {
    ":hover": {
      opacity: 0.8,
    },
    ":hover:disabled": {
      opacity: 1,
    },
  },
  colorHover: {
    ":hover": {
      backgroundColor: "var(--secondary-background)",
    },
    ":hover:disabled": {
      backgroundColor: "inherit",
    },
  },
});

function BaseButton(
  {
    componentName,
    onPress,
    children,
    jsStyle,
    color,
    bare = false,
    disabled,
    ...otherProps
  }: BaseButtonProps,
  ref?: React.Ref<HTMLButtonElement>
) {
  return (
    <button
      {...otherProps}
      data-test-id={componentName ?? "BaseButton"}
      disabled={disabled ? true : undefined}
      ref={ref}
      onClick={onPress}
      className={createClassNames(
        jsStyles.root,
        color === "positive" && jsStyles.positive,
        color === "secondary" && jsStyles.secondary,
        color === "negative" && jsStyles.negative,
        bare && jsStyles.bare,
        disabled && jsStyles.disabled,
        bare ? jsStyles.colorHover : jsStyles.opacityHover,
        jsStyle
      )}
    >
      {children}
    </button>
  );
}

export default React.forwardRef(BaseButton);
