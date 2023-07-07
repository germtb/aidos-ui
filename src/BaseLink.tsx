import React from "react";
import { InterctableColor, getInteractableJSStyles } from "./Interactable";
import { JSStyle, Padding, jss } from "./JSS";

export interface BaseLinkProps
  extends React.LinkHTMLAttributes<HTMLAnchorElement> {
  onPress?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  jsStyle?: JSStyle;
  color: InterctableColor;
  disabled?: boolean;
  bare?: boolean;
  className?: undefined;
  animateInteraction?: boolean;
  padding?: Padding;
}

export const BaseLink = React.forwardRef(
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
    }: BaseLinkProps,
    ref?: React.Ref<HTMLAnchorElement>
  ) => {
    return (
      <a
        {...otherProps}
        aria-disabled={disabled ? true : undefined}
        ref={ref}
        onClick={
          onPress
            ? (event) => {
                if (disabled) {
                  return;
                }

                onPress(event);
              }
            : undefined
        }
        className={jss([
          ...getInteractableJSStyles({
            color,
            bare,
            disabled,
            animateInteraction,
            padding,
          }),
          {
            textDecoration: "none",
          },
          jsStyle,
        ])}
      >
        {children}
      </a>
    );
  }
);
