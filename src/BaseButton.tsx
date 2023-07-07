import React from "react";
import { InterctableColor, getInteractableJSStyles } from "./Interactable";
import { JSStyle, Padding, jss } from "./JSS";

export interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onPress: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  jsStyle?: JSStyle;
  color: InterctableColor;
  bare?: boolean;
  className?: undefined;
  animateInteraction?: boolean;
  padding?: Padding;
}

export const BaseButton = React.forwardRef(
  (
    {
      onPress,
      children,
      jsStyle,
      color,
      bare = false,
      disabled,
      animateInteraction = true,
      padding,
      ...otherProps
    }: BaseButtonProps,
    ref?: React.Ref<HTMLButtonElement>
  ) => {
    return (
      <button
        {...otherProps}
        aria-disabled={disabled ? true : undefined}
        ref={ref}
        onClick={(event) => {
          if (disabled) {
            return;
          }

          onPress(event);
        }}
        className={jss([
          ...getInteractableJSStyles({
            color,
            bare,
            disabled,
            animateInteraction,
            padding,
          }),
          jsStyle,
        ])}
      >
        {children}
      </button>
    );
  }
);
