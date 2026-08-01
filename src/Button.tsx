import React from "react";

import { BaseButton, BaseButtonProps } from "./BaseButton";
import { Text } from "./Text";
import { IconType } from "./IconType";
import { Row } from "./Row";
import { Icon } from "./Icon";
import { FlexLayoutProps } from "./FlexLayout";
import { InteractableColor, getGlyphColor } from "./Interactable";
import { Align, Gap, Justify, cssVar } from "./jss";

export interface ButtonProps extends Omit<
  BaseButtonProps,
  "border" | "padding"
> {
  children: string;
  color: InteractableColor;
  icon?: IconType;
  iconPosition?: "left" | "right";
  rowProps?: FlexLayoutProps;
  align?: Align;
  gap?: Gap;
  justify?: Justify;
}

export const Button = React.forwardRef(function Button(
  {
    children,
    color,
    bare,
    disabled,
    icon,
    iconPosition = "left",
    align = "center",
    gap = "medium",
    justify = "center",
    jss,
    ...otherProps
  }: ButtonProps,
  ref?: React.Ref<HTMLButtonElement>,
) {
  return (
    <BaseButton
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
        },
        jss,
      ]}
    >
      <Row grow={true} align={align} gap={gap} justify={justify}>
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
    </BaseButton>
  );
});
