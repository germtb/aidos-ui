import React from "react";

import { BaseLink, BaseLinkProps } from "./BaseLink";
import { Text } from "./Text";
import { IconType } from "./IconType";
import { Row } from "./Row";
import { Icon } from "./Icon";
import { FlexLayoutProps } from "./FlexLayout";
import { InterctableColor, getGlyphColor } from "./Interactable";
import { Size, Align, Gap, Justify, getPadding, grow } from "./JSS";

export interface LinkProps extends BaseLinkProps {
  label: string;
  color: InterctableColor;
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
          },
          getPadding("medium"),
          jsStyle,
        ]}
      >
        <Row jsStyle={grow} align={align} gap={gap} justify={justify}>
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
