import React from "react";
import { InteractableColor, getInteractableJSStyles } from "./Interactable";
import { JSStyle, Padding, jss } from "./jss";

export interface BaseLinkProps
  extends React.LinkHTMLAttributes<HTMLAnchorElement> {
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  target?: string;
  jsStyle?: JSStyle;
  color: InteractableColor;
  href: string;
  disabled?: boolean;
  bare?: boolean;
  className?: undefined;
  animateInteraction?: boolean;
  padding?: Padding;
}

export const BaseLink = React.forwardRef(
  (
    {
      onClick,
      children,
      jsStyle,
      color,
      bare = false,
      disabled,
      animateInteraction = true,
      padding,
      href,
      ...otherProps
    }: BaseLinkProps,
    ref?: React.Ref<HTMLAnchorElement>
  ) => {
    return (
      <a
        {...otherProps}
        aria-disabled={disabled ? true : undefined}
        href={disabled ? undefined : href}
        role="link"
        ref={ref}
        onClick={
          onClick
            ? (event) => {
                if (disabled) {
                  return;
                }

                onClick(event);
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
          jsStyle,
        ])}
      >
        {children}
      </a>
    );
  }
);
