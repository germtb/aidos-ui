import React from "react";
import { Icon } from "./Icon";
import { IconType } from "./IconType";
import { getGlyphColor } from "./Interactable";
import { Size } from "./jss";
import { BaseLink, BaseLinkProps } from "./BaseLink";

const sizes = {
  xsmall: 20,
  small: 24,
  medium: 32,
  large: 40,
  xlarge: 48,
};

export interface IconLinkProps extends BaseLinkProps {
  icon: IconType;
  size: Size;
}

export const IconLink = React.forwardRef(
  (
    { icon, size, color, bare, disabled, ...buttonProps }: IconLinkProps,
    ref?: React.Ref<HTMLAnchorElement>
  ) => {
    return (
      <BaseLink
        {...buttonProps}
        bare={bare}
        jsStyle={[
          {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: sizes[size],
            width: sizes[size],
            borderRadius: sizes[size] / 2,
            textDecoration: "none",
          },
          !disabled && {
            ":active": {
              transform: "scale(0.92)",
            },
          },
        ]}
        color={color}
        ref={ref}
        disabled={disabled}
      >
        <Icon
          size={size}
          icon={icon}
          color={getGlyphColor(color, disabled, bare)}
        />
      </BaseLink>
    );
  }
);
