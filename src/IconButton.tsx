import React from "react";
import { BaseButton, BaseButtonProps, ButtonColor } from "./BaseButton";
import { Icon } from "./Icon";
import { createJSStyles, Size, TextColor } from "./Palette";
import { IconType } from "./IconType";

const jsStyles = createJSStyles({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ":active": {
      transform: "scale(0.92)",
    },
    ":disabled:active": {
      transform: "scale(1)",
    },
  },
  small: {
    height: 24,
    width: 24,
    borderRadius: 12,
  },
  medium: {
    height: 32,
    width: 32,
    borderRadius: 16,
  },
  large: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});

interface IconButtonProps extends BaseButtonProps {
  icon: IconType;
  size: Size;
}

const getIconColor = (
  color: ButtonColor,
  disabled: boolean | undefined,
  bare: boolean | undefined
): TextColor => {
  if (disabled) {
    return "subtle";
  }

  switch (color) {
    case "positive":
      return bare ? "highlight" : "light";
    case "negative":
      return bare ? "negative" : "light";
    case "secondary":
      return bare ? "primary" : "secondary";
  }
};

export const IconButton = React.forwardRef(
  (
    {
      icon,
      size,
      color,
      bare,
      disabled,
      componentName,
      ...buttonProps
    }: IconButtonProps,
    ref?: React.Ref<HTMLButtonElement>
  ) => {
    return (
      <BaseButton
        {...buttonProps}
        componentName={(componentName ?? []).concat("IconButton")}
        bare={bare}
        jsStyle={[
          jsStyles.button,
          size === "small" && jsStyles.small,
          size === "medium" && jsStyles.medium,
          size === "large" && jsStyles.large,
        ]}
        color={color}
        ref={ref}
        disabled={disabled}
      >
        <Icon
          size={size}
          icon={icon}
          color={getIconColor(color, disabled, bare)}
        />
      </BaseButton>
    );
  }
);
