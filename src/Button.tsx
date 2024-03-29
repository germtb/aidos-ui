import React from "react";

import { BaseButton, BaseButtonProps } from "./BaseButton";
import { Text } from "./Text";
import { IconType } from "./IconType";
import { Row } from "./Row";
import { Icon } from "./Icon";
import { FlexLayoutProps } from "./FlexLayout";
import { InteractableColor, getGlyphColor } from "./Interactable";
import { Align, Gap, Justify, Size, cssVar, getPadding } from "./jss";

export interface ButtonProps extends BaseButtonProps {
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
  bold?: boolean;
}

export const Button = React.forwardRef(
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
      bold,
      padding = "medium",
      ...otherProps
    }: ButtonProps,
    ref?: React.Ref<HTMLButtonElement>
  ) => {
    return (
      <BaseButton
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
      </BaseButton>
    );
  }
);
