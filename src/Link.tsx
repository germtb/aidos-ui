import { controlSizes, type ControlSize } from "./controlSize";
import React, { ReactNode } from "react";

import { BaseLink, BaseLinkProps } from "./BaseLink";
import { Text } from "./Text";
import { IconType } from "./IconType";
import { Row } from "./Row";
import { Icon } from "./Icon";
import { FlexLayoutProps } from "./FlexLayout";
import { InteractableColor, getGlyphColor, getCSSColor } from "./Interactable";
import { Align, Gap, Justify, cssVar } from "./jss";

export interface LinkProps extends Omit<BaseLinkProps, "border" | "padding"> {
  children?: ReactNode;
  color: InteractableColor;
  size?: ControlSize;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  icon?: IconType;
  underline?: boolean;
  iconPosition?: "left" | "right";
  rowProps?: FlexLayoutProps;
  align?: Align;
  gap?: Gap;
  justify?: Justify;
  inline?: boolean;
}

export const Link = React.forwardRef(function Link(
  {
    children,
    color,
    bare,
    disabled,
    icon,
    underline,
    iconPosition = "left",
    size = "medium",
    leading,
    trailing,
    rowProps,
    align = "center",
    gap = "medium",
    justify = "center",
    jss,
    inline = true,
    ...otherProps
  }: LinkProps,
  ref?: React.Ref<HTMLAnchorElement>,
) {
  const metrics = controlSizes[size];
  const glyph = getGlyphColor(color, disabled, bare);
  return (
    <BaseLink
      {...otherProps}
      bare={bare}
      ref={ref}
      color={color}
      disabled={disabled}
      padding="none"
      jss={[
        {
          height: metrics.height,
          minWidth: 0,
          maxWidth: "100%",
          padding: `0 ${metrics.padding}px`,
          borderRadius: cssVar("--border-radius-l"),
          justifyContent: "center",
          userSelect: "none",
          display: inline ? "inline-flex" : "flex",
          textDecoration: "none",
        },
        underline && {
          textDecorationLine: "underline",
          textDecorationThickness: "2px",
          textUnderlineOffset: "2px",
          textDecorationColor: getCSSColor(color, disabled, bare),
        },
        jss,
      ]}
    >
      <Row
        {...rowProps}
        direction="row"
        jss={[
          {
            display: inline ? "inline-flex" : "flex",
            minWidth: 0,
          },
          rowProps?.jss,
        ]}
        grow={true}
        align={align}
        gap={gap}
        justify={justify}
      >
        {leading}
        {icon && iconPosition === "left" && (
          <Icon
            icon={icon}
            size="medium"
            jss={{ width: metrics.icon, height: metrics.icon, flexShrink: 0 }}
            color={glyph}
          />
        )}
        <Text
          size={metrics.text}
          color={glyph}
          jss={{
            minWidth: 0,
            fontWeight: 600,
            letterSpacing: "-0.01em",
          }}
        >
          {children}
        </Text>
        {icon && iconPosition === "right" && (
          <Icon
            icon={icon}
            size="medium"
            jss={{ width: metrics.icon, height: metrics.icon, flexShrink: 0 }}
            color={glyph}
          />
        )}
        {trailing}
      </Row>
    </BaseLink>
  );
});
