import React from "react";
import BaseButton, { BaseButtonProps, ButtonColor } from "./BaseButton";
import Icon from "./Icon";
import { createJSStyles, Size } from "./Palette";
import { IconType } from "./IconType";
import { GlyphColor } from "./Glyph";

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
  full?: boolean;
}

const getIconColor = (
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
      return bare ? "primary" : "secondary";
  }
};

function IconButton(
  {
    icon,
    size,
    color,
    bare,
    disabled,
    full,
    componentName,
    ...buttonProps
  }: IconButtonProps,
  ref?: React.Ref<HTMLButtonElement>
) {
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
        full={full}
        size={size}
        icon={icon}
        color={getIconColor(color, disabled, bare)}
      />
    </BaseButton>
  );
}

export default React.forwardRef(IconButton);
