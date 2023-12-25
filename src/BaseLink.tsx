import React, { useContext } from "react";
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
  border?: boolean;
  className?: undefined;
  animateInteraction?: boolean;
  padding?: Padding;
}

// This only exists to make NextJS happy, it should not be used in any other case
export const BaseLinkComponentOverrideContext = React.createContext((props) => (
  <a {...props} />
));

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
      border,
      role = "link",
      ...otherProps
    }: BaseLinkProps,
    ref?: React.Ref<HTMLAnchorElement>
  ) => {
    const Link = useContext(BaseLinkComponentOverrideContext);

    return (
      <Link
        {...otherProps}
        aria-disabled={disabled ? true : undefined}
        href={href}
        role={role}
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
            border,
            bare,
            disabled,
            animateInteraction,
            padding,
          }),
          disabled && { pointerEvents: "none" },
          jsStyle,
        ])}
      >
        {children}
      </Link>
    );
  }
);
