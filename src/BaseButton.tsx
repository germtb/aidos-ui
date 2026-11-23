import React from "react";
import { InteractableColor, getInteractableJSS } from "./Interactable";
import { JSS, Padding, toClassnames } from "./jss";
import { glass } from "./glass";
import { useGlassRef } from "./useGlassRef";

export interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  jss?: JSS;
  material?: "glass";
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
    material,
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
  const surfaceJSS = [material === "glass" && glass(), jss];
  const surfaceRef = useGlassRef(surfaceJSS, ref);
  return (
    <button
      type={type}
      {...otherProps}
      aria-disabled={disabled ? true : undefined}
      ref={surfaceRef}
      onClick={(event) => {
        if (disabled) {
          event.preventDefault();
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
        surfaceJSS,
      ])}
    >
      {children}
    </button>
  );
});
