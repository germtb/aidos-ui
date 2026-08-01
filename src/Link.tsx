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
    align = "center",
    gap = "medium",
    justify = "center",
    jss,
    inline = true,
    ...otherProps
  }: LinkProps,
  ref?: React.Ref<HTMLAnchorElement>,
) {
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
          height: 34,
          padding: "0 14px",
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
        jss={{
          display: inline ? "inline-flex" : "flex",
        }}
        grow={true}
        align={align}
        gap={gap}
        justify={justify}
      >
        {icon && iconPosition === "left" && (
          <Icon
            icon={icon}
            size="medium"
            color={getGlyphColor(color, disabled, bare)}
          />
        )}
        <Text
          size="medium"
          color={getGlyphColor(color, disabled, bare)}
          jss={{
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
            color={getGlyphColor(color, disabled, bare)}
          />
        )}
      </Row>
    </BaseLink>
  );
});
