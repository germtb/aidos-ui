import React, { ReactNode } from "react";

import { BaseLink, BaseLinkProps } from "./BaseLink";
import { Text } from "./Text";
import { IconType } from "./IconType";
import { Row } from "./Row";
import { Icon } from "./Icon";
import { FlexLayoutProps } from "./FlexLayout";
import { InteractableColor, getGlyphColor, getCSSColor } from "./Interactable";
import { Size, Align, Gap, Justify, cssVar } from "./jss";

export interface LinkProps extends BaseLinkProps {
  children?: ReactNode;
  color: InteractableColor;
  size?: Size;
  icon?: IconType;
  underline?: boolean;
  iconSize?: Size;
  iconPosition?: "left" | "right";
  rowProps?: FlexLayoutProps;
  align?: Align;
  gap?: Gap;
  justify?: Justify;
  bold?: boolean;
  inline?: boolean;
}

export const Link = React.forwardRef(
  (
    {
      children,
      color,
      bare,
      disabled,
      icon,
      underline,
      iconSize = "medium",
      iconPosition = "left",
      align = "center",
      gap = "small",
      justify = "center",
      jss,
      size = "medium",
      padding = "medium",
      inline = true,
      bold,
      ...otherProps
    }: LinkProps,
    ref?: React.Ref<HTMLAnchorElement>
  ) => {
    return (
      <BaseLink
        {...otherProps}
        bare={bare}
        ref={ref}
        color={color}
        disabled={disabled}
        padding={padding}
        jss={[
          {
            borderRadius: cssVar("--border-radius-m"),
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
              size={iconSize}
              color={getGlyphColor(color, disabled, bare)}
            />
          )}
          <Text
            bold={bold}
            size={size}
            color={getGlyphColor(color, disabled, bare)}
          >
            {children}
          </Text>
          {icon && iconPosition === "right" && (
            <Icon
              icon={icon}
              size={iconSize}
              color={getGlyphColor(color, disabled, bare)}
            />
          )}
        </Row>
      </BaseLink>
    );
  }
);
