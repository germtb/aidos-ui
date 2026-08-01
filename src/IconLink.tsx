import React from "react";
import { Icon } from "./Icon";
import { IconType } from "./IconType";
import { getGlyphColor } from "./Interactable";
import { BaseLink, BaseLinkProps } from "./BaseLink";

export interface IconLinkProps extends Omit<
  BaseLinkProps,
  "border" | "padding"
> {
  icon: IconType;
}

export const IconLink = React.forwardRef(function IconLink(
  { icon, color, bare, disabled, jss, ...otherProps }: IconLinkProps,
  ref?: React.Ref<HTMLAnchorElement>,
) {
  return (
    <BaseLink
      {...otherProps}
      bare={bare}
      jss={[
        {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 34,
          width: 34,
          borderRadius: 17,
          textDecoration: "none",
        },
        jss,
      ]}
      color={color}
      ref={ref}
      disabled={disabled}
    >
      <Icon
        size="medium"
        icon={icon}
        color={getGlyphColor(color, disabled, bare)}
      />
    </BaseLink>
  );
});
