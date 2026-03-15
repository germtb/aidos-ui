import React from "react";
import { InteractableColor, getInteractableJSS } from "./Interactable";
import { JSS, Padding, toClassnames } from "./jss";

export interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  jss?: JSS;
  color: InteractableColor;
  bare?: boolean;
  border?: boolean;
  className?: undefined;
  animateInteraction?: boolean;
  padding?: Padding;
}

export const BaseButton = React.forwardRef(
  (
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
      ...otherProps
    }: BaseButtonProps,
    ref?: React.Ref<HTMLButtonElement>
  ) => {
    return (
      <button
        type="button"
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
  }
);
