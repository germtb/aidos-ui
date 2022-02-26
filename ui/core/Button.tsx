import React from "react";
import { createJSStyles } from "./Palette";
import BaseButton, { BaseButtonProps, ButtonColor } from "./BaseButton";
import Text from "./Text";
import { IconType } from "./IconType";
import Row from "./Row";
import Icon from "./Icon";
import { GlyphColor, GlyphSize } from "./Glyph";

export interface ButtonProps extends BaseButtonProps {
  label: string;
  color: ButtonColor;
  icon?: IconType;
  iconSize?: GlyphSize;
  children?: undefined;
}

const jsStyles = createJSStyles({
  root: {
    flexGrow: 1,
    borderRadius: "var(--border-radius-m)",
    paddingTop: "var(--spacing-s)",
    paddingBottom: "var(--spacing-s)",
    paddingLeft: "var(--spacing-m)",
    paddingRight: "var(--spacing-m)",
    justifyContent: "center",
  },
});

const getGlyphColor = (
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

function Button(
  {
    label,
    color,
    bare,
    disabled,
    icon,
    iconSize = "medium",
    componentName,
    ...otherProps
  }: ButtonProps,
  ref?: React.Ref<HTMLButtonElement>
) {
  const labelElement = (
    <Text size="medium" color={getGlyphColor(color, disabled, bare)}>
      {label}
    </Text>
  );
  return (
    <BaseButton
      {...otherProps}
      componentName={componentName ?? "Box"}
      bare={bare}
      ref={ref}
      color={color}
      disabled={disabled}
      jsStyle={jsStyles.root}
    >
      {icon ? (
        <Row spacing="small">
          <Icon
            icon={icon}
            size={iconSize}
            color={getGlyphColor(color, disabled, bare)}
          />
          {labelElement}
        </Row>
      ) : (
        labelElement
      )}
    </BaseButton>
  );
}

export default React.forwardRef(Button);
