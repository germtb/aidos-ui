import React from "react";
import { InteractableColor, getInteractableJSS } from "./Interactable";
import { JSS, Padding, toClassnames } from "./jss";

export interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  jss?: JSS;
  color: InteractableColor;
  bare?: boolean;
  border?: boolean;
  className?: undefined;
  animateInteraction?: boolean;
  padding?: Padding;
  type?: "submit" | "reset" | "button";
}

export const BaseButton = React.forwardRef(function BaseButton(
  {
    onClick,
    children,
    jss,
    color,
    bare = false,
    border = false,
    disabled,
    animateInteraction = true,
    padding,
    type = "button",
    ...otherProps
  }: BaseButtonProps,
  ref?: React.Ref<HTMLButtonElement>,
) {
  return (
    <button
      type={type}
      {...otherProps}
      aria-disabled={disabled ? true : undefined}
      ref={ref}
      onClick={(event) => {
        if (disabled) {
          return;
        }

        onClick?.(event);
      }}
      className={toClassnames([
        ...getInteractableJSS({
          color,
          bare,
          border,
          disabled,
          animateInteraction,
          padding,
        }),
        jss,
      ])}
    >
      {children}
    </button>
  );
});
