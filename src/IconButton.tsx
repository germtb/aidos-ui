import { controlSizes, type ControlSize } from "./controlSize";
import React from "react";
import { BaseButton, BaseButtonProps } from "./BaseButton";
import { Icon } from "./Icon";
import { IconType } from "./IconType";
import { Span } from "./Text";

export interface IconButtonProps extends Omit<
  BaseButtonProps,
  "border" | "padding"
> {
  icon: IconType;
  size?: ControlSize;
  label?: string;
}

export const IconButton = React.forwardRef(function IconButton(
  {
    icon,
    color,
    bare,
    disabled,
    size = "medium",
    jss,
    label,
    ...buttonProps
  }: IconButtonProps,
  ref?: React.Ref<HTMLButtonElement>,
) {
  const metrics = controlSizes[size];
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
          height: metrics.height,
          width: metrics.height,
          minWidth: metrics.height,
          flexShrink: 0,
          padding: 0,
          borderRadius: metrics.height / 2,
        },
        jss,
      ]}
      color={color}
      ref={ref}
      disabled={disabled}
    >
      <Icon
        size="medium"
        jss={{ width: metrics.icon, height: metrics.icon }}
        icon={icon}
        color="inherit"
      />
      {label && (
        <Span size="medium" color="inherit">
          {label}
        </Span>
      )}
    </BaseButton>
  );
});
