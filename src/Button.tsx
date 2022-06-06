import React from "react";
import { Align, createJSStyles, grow, Justify, Spacing } from "./Palette";
import { BaseButton, BaseButtonProps, ButtonColor } from "./BaseButton";
import { Text } from "./Text";
import { IconType } from "./IconType";
import { Row } from "./Row";
import { Icon } from "./Icon";
import { GlyphColor, GlyphSize } from "./Glyph";
import { FlexLayoutProps } from "./FlexLayout";

export interface ButtonProps extends BaseButtonProps {
  label: string;
  color: ButtonColor;
  icon?: IconType;
  iconSize?: GlyphSize;
  children?: undefined;
  iconPosition?: "left" | "right";
  rowProps?: FlexLayoutProps;
  align?: Align;
  spacing?: Spacing;
  justify?: Justify;
}

const jsStyles = createJSStyles({
  root: {
    borderRadius: "var(--border-radius-m)",
    paddingTop: "var(--spacing-s)",
    paddingBottom: "var(--spacing-s)",
    paddingLeft: "var(--spacing-m)",
    paddingRight: "var(--spacing-m)",
    justifyContent: "center",
    userSelect: "none",
  },
});

export const getGlyphColor = (
  color: ButtonColor,
  disabled: boolean | undefined,
  bare: boolean | undefined
): GlyphColor => {
  if (disabled) {
    return "subtle";
  }

  switch (color) {
    case "positive":
      return bare ? "highlight" : "light";
    case "negative":
      return bare ? "negative" : "light";
    case "secondary":
      return "primary";
  }
};

export const Button = React.forwardRef(
  (
    {
      label,
      color,
      bare,
      disabled,
      icon,
      iconSize = "medium",
      componentName,
      iconPosition = "left",
      align = "center",
      spacing = "small",
      justify = "center",
      jsStyle,
      ...otherProps
    }: ButtonProps,
    ref?: React.Ref<HTMLButtonElement>
  ) => {
    const labelElement = (
      <Text size="medium" color={getGlyphColor(color, disabled, bare)}>
        {label}
      </Text>
    );
    return (
      <BaseButton
        {...otherProps}
        componentName={(componentName ?? []).concat("Button")}
        bare={bare}
        ref={ref}
        color={color}
        disabled={disabled}
        jsStyle={[jsStyles.root, jsStyle]}
      >
        <Row jsStyle={grow} align={align} spacing={spacing} justify={justify}>
          {icon && iconPosition === "left" && (
            <Icon
              icon={icon}
              size={iconSize}
              color={getGlyphColor(color, disabled, bare)}
            />
          )}
          {labelElement}
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
