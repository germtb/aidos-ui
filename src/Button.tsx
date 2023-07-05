import React from "react";
import {
  Align,
  createJSStyles,
  grow,
  Justify,
  Gap,
  Size,
  TextColor,
  getPadding,
} from "./Palette";
import { BaseButton, BaseButtonProps } from "./BaseButton";
import { Text } from "./Text";
import { IconType } from "./IconType";
import { Row } from "./Row";
import { Icon } from "./Icon";
import { FlexLayoutProps } from "./FlexLayout";
import { InterctableColor, getGlyphColor } from "./Interactable";

export interface ButtonProps extends BaseButtonProps {
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

const jsStyles = createJSStyles({
  root: {
    borderRadius: "var(--border-radius-m)",
    justifyContent: "center",
    userSelect: "none",
  },
});

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
        jsStyle={[jsStyles.root, getPadding("medium"), jsStyle]}
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
      </BaseButton>
    );
  }
);
