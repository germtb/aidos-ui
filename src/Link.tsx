import React from "react";

import { BaseLink, BaseLinkProps } from "./BaseLink";
import { Text } from "./Text";
import { IconType } from "./IconType";
import { Row } from "./Row";
import { Icon } from "./Icon";
import { FlexLayoutProps } from "./FlexLayout";
import { InteractableColor, getGlyphColor } from "./Interactable";
import { Size, Align, Gap, Justify, cssVar } from "./jss";

export interface LinkProps extends BaseLinkProps {
  label: string;
  color: InteractableColor;
  size?: Size;
  icon?: IconType;
  iconSize?: Size;
  children?: undefined;
  iconPosition?: "left" | "right";
  rowProps?: FlexLayoutProps;
  align?: Align;
  gap?: Gap;
  justify?: Justify;
}

export const Link = React.forwardRef(
  (
    {
      label,
      color,
      bare,
      disabled,
      icon,
      iconSize = "medium",
      iconPosition = "left",
      align = "center",
      gap = "small",
      justify = "center",
      jsStyle,
      size = "medium",
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
        jsStyle={[
          {
            borderRadius: "var(--border-radius-m)",
            justifyContent: "center",
            userSelect: "none",
            padding: cssVar("--spacing-m"),
            display: "inline-flex",
            textDecoration: "none",
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
          <Text size={size} color={getGlyphColor(color, disabled, bare)}>
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
