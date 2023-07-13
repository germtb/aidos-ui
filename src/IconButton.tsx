import React from "react";
import { BaseButton, BaseButtonProps } from "./BaseButton";
import { Icon } from "./Icon";
import { IconType } from "./IconType";
import { getGlyphColor } from "./Interactable";
import { Size } from "./jss";

const sizes = {
  xsmall: 20,
  small: 24,
  medium: 32,
  large: 40,
  xlarge: 48,
};

export interface IconButtonProps extends BaseButtonProps {
  icon: IconType;
  size: Size;
}

export const IconButton = React.forwardRef(
  (
    {
      icon,
      size,
      color,
      bare,
      disabled,
      jsStyle,
      ...buttonProps
    }: IconButtonProps,
    ref?: React.Ref<HTMLButtonElement>
  ) => {
    return (
      <BaseButton
        {...buttonProps}
        bare={bare}
        jsStyle={[
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
          jsStyle,
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
      </BaseButton>
    );
  }
);
