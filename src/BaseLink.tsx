import React, { useContext } from "react";
import { InteractableColor, getInteractableJSS } from "./Interactable";
import { JSS, Padding, toClassnames } from "./jss";
import { glass } from "./glass";
import { useGlassRef } from "./useGlassRef";

export interface BaseLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  target?: string;
  jss?: JSS;
  material?: "glass";
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

export const BaseLink = React.forwardRef(function BaseLink(
  {
    onClick,
    children,
    jss,
    material,
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
  ref?: React.Ref<HTMLAnchorElement>,
) {
  const Link = useContext(BaseLinkComponentOverrideContext);

  const surfaceJSS = [material === "glass" && glass(), jss];
  const surfaceRef = useGlassRef(surfaceJSS, ref);
  return (
    <Link
      {...otherProps}
      aria-disabled={disabled ? true : undefined}
      href={href}
      role={role}
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
          border,
          bare,
          disabled,
          animateInteraction,
          padding,
        }),
        disabled && { pointerEvents: "none" },
        surfaceJSS,
      ])}
    >
      {children}
    </Link>
  );
});
