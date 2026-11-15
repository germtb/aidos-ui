import { controlSizes, type ControlSize } from "./controlSize";
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
  size?: ControlSize;
}

export const IconLink = React.forwardRef(function IconLink(
  {
    icon,
    color,
    bare,
    disabled,
    size = "medium",
    jss,
    ...otherProps
  }: IconLinkProps,
  ref?: React.Ref<HTMLAnchorElement>,
) {
  const metrics = controlSizes[size];
  return (
    <BaseLink
      {...otherProps}
      bare={bare}
      jss={[
        {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: metrics.height,
          width: metrics.height,
          minWidth: metrics.height,
          flexShrink: 0,
          padding: 0,
          borderRadius: metrics.height / 2,
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
        jss={{ width: metrics.icon, height: metrics.icon }}
        icon={icon}
        color={getGlyphColor(color, disabled, bare)}
      />
    </BaseLink>
  );
});
