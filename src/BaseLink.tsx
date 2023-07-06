import React from "react";
import { JSStyle, createClassNames, Padding, createJSStyle } from "./Styles";
import { InterctableColor, getInteractableJSStyles } from "./Interactable";

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

const jsStyles = createJSStyle({
  root: {
    textDecoration: "none",
  },
});

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
        className={createClassNames([
          ...getInteractableJSStyles({
            color,
            bare,
            disabled,
            animateInteraction,
            padding,
          }),
          jsStyles.root,
          jsStyle,
        ])}
      >
        {children}
      </a>
    );
  }
);
