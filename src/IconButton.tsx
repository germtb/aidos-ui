import React from "react";
import { BaseButton, BaseButtonProps } from "./BaseButton";
import { Icon } from "./Icon";
import { IconType } from "./IconType";
import { getGlyphColor } from "./Interactable";
import { Span } from "./Text";

export interface IconButtonProps extends Omit<
  BaseButtonProps,
  "border" | "padding"
> {
  icon: IconType;
  label?: string;
}

export const IconButton = React.forwardRef(function IconButton(
  { icon, color, bare, disabled, jss, label, ...buttonProps }: IconButtonProps,
  ref?: React.Ref<HTMLButtonElement>,
) {
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
          height: 34,
          width: 34,
          borderRadius: 17,
        },
        jss,
      ]}
      color={color}
      ref={ref}
      disabled={disabled}
    >
      <Icon
        size="medium"
        icon={icon}
        color={getGlyphColor(color, disabled, bare)}
      />
      {label && (
        <Span size="medium" color={getGlyphColor(color, disabled, bare)}>
          {label}
        </Span>
      )}
    </BaseButton>
  );
});
