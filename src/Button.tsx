import { controlSizes, type ControlSize } from "./controlSize";
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
  children: React.ReactNode;
  color: InteractableColor;
  size?: ControlSize;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
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
    size = "medium",
    leading,
    trailing,
    rowProps,
    align = "center",
    gap = "medium",
    justify = "center",
    jss,
    ...otherProps
  }: ButtonProps,
  ref?: React.Ref<HTMLButtonElement>,
) {
  const metrics = controlSizes[size];
  const glyph = getGlyphColor(color, disabled, bare);
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
          height: metrics.height,
          minWidth: 0,
          maxWidth: "100%",
          padding: `0 ${metrics.padding}px`,
          borderRadius: cssVar("--border-radius-l"),
          justifyContent: "center",
          userSelect: "none",
        },
        jss,
      ]}
    >
      <Row
        {...rowProps}
        direction="row"
        grow={true}
        align={align}
        gap={gap}
        justify={justify}
        jss={[{ minWidth: 0 }, rowProps?.jss]}
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
    </BaseButton>
  );
});
