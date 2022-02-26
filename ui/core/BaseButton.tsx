import React from "react";
import { JSStyles, createClassNames, createJSStyles } from "./Palette";

export type ButtonColor = "positive" | "secondary" | "negative";

export interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  componentName?: string;
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
    ":active": {
      opacity: 0.8,
    },
    ":active:disabled": {
      opacity: 1,
    },
    ":disabled": {
      color: "var(--secondary-text)",
      backgroundColor: "var(--background-button-secondary)",
    },
  },
  positive: {
    color: "var(--color-button-positive)",
    backgroundColor: "var(--background-button-positive)",
  },
  secondary: {
    color: "var(--color-button-secondary)",
    backgroundColor: "var(--background-button-secondary)",
  },
  negative: {
    color: "var(--color-button-negative)",
    backgroundColor: "var(--background-button-negative)",
  },
  disabled: {
    cursor: "default",
  },
  bare: {
    backgroundColor: "inherit",
    ":disabled": {
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
        jsStyle
      )}
    >
      {children}
    </button>
  );
}

export default React.forwardRef(BaseButton);
