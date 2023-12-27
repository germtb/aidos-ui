import React, { ReactElement } from "react";

import { BaseLink, BaseLinkProps } from "./BaseLink";
import { Text } from "./Text";
import { IconType } from "./IconType";
import { Row } from "./Row";
import { Icon } from "./Icon";
import { FlexLayoutProps } from "./FlexLayout";
import { InteractableColor, getGlyphColor, getCSSColor } from "./Interactable";
import {
  Size,
  Align,
  Gap,
  Justify,
  cssVar,
  JSStylesProvider,
  getPadding,
} from "./jss";

export interface LinkProps extends BaseLinkProps {
  label: string;
  color: InteractableColor;
  size?: Size;
  icon?: IconType;
  underline?: boolean;
  iconSize?: Size;
  children?: undefined;
  iconPosition?: "left" | "right";
  rowProps?: FlexLayoutProps;
  align?: Align;
  gap?: Gap;
  justify?: Justify;
  bold?: boolean;
}

export const Link = React.forwardRef(
  (
    {
      label,
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
      jsStyle,
      size = "medium",
      padding = "medium",
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
        jsStyle={[
          {
            borderRadius: cssVar("--border-radius-m"),
            justifyContent: "center",
            userSelect: "none",
            display: "inline-flex",
            textDecoration: "none",
          },
          underline && {
            textDecorationLine: "underline",
            textDecorationThickness: "2px",
            textUnderlineOffset: "2px",
            textDecorationColor: getCSSColor(color, disabled, bare),
          },
          jsStyle,
        ]}
      >
        <Row grow={true} align={align} gap={gap} justify={justify}>
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
            {label}
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
