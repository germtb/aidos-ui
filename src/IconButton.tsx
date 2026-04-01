import React from "react";
import { BaseButton, BaseButtonProps } from "./BaseButton";
import { Icon } from "./Icon";
import { IconType } from "./IconType";
import { getGlyphColor } from "./Interactable";
import { Size } from "./jss";
import { Span } from "./Text";

const sizes: {
  [key in Size]: number;
} = {
  xsmall: 20,
  small: 24,
  medium: 32,
  large: 40,
  xlarge: 48,
  xxlarge: 56,
  xxxlarge: 64,
};

export interface IconButtonProps extends BaseButtonProps {
  icon: IconType;
  size: Size;
  label?: string;
  labelSize?: Size;
}

export const IconButton = React.forwardRef(
  (
    {
      icon,
      size,
      color,
      bare,
      disabled,
      jss,
      label,
      labelSize = "medium",
      ...buttonProps
    }: IconButtonProps,
    ref?: React.Ref<HTMLButtonElement>
  ) => {
    return (
      <BaseButton
        {...buttonProps}
        aria-label={buttonProps["aria-label"] ?? label}
        bare={bare}
        jss={[
          {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: sizes[size],
            width: sizes[size],
            borderRadius: sizes[size] / 2,
          },
          !disabled && {
            ":active": {
              transform: "scale(0.92)",
            },
          },
          jss,
        ]}
        color={color}
        ref={ref}
        disabled={disabled}
      >
        <Icon
          size={size}
          icon={icon}
          color={getGlyphColor(color, disabled, bare)}
        />
        {label && (
          <Span size={labelSize} color={getGlyphColor(color, disabled, bare)}>
            {label}
          </Span>
        )}
      </BaseButton>
    );
  }
);
