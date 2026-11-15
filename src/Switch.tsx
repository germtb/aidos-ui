import React from "react";
import { BaseButton, type BaseButtonProps } from "./BaseButton";
import { BaseView } from "./BaseView";

export interface SwitchProps extends Omit<
  BaseButtonProps,
  "color" | "children" | "onClick" | "value" | "aria-label"
> {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const Switch = React.forwardRef(function Switch(
  { label, checked, onCheckedChange, disabled, jss, ...props }: SwitchProps,
  ref?: React.Ref<HTMLButtonElement>,
) {
  return (
    <BaseButton
      {...props}
      ref={ref}
      bare
      color="secondary"
      role="switch"
      aria-label={label}
      aria-checked={checked}
      disabled={disabled}
      animateInteraction={false}
      onClick={() => onCheckedChange(!checked)}
      jss={[
        {
          width: 36,
          height: 24,
          padding: 2,
          flexShrink: 0,
          borderRadius: 12,
          opacity: disabled ? 0.5 : 1,
        },
        jss,
      ]}
    >
      <BaseView
        aria-hidden
        jss={{
          width: 32,
          height: 20,
          padding: 2,
          borderRadius: 10,
          background: checked
            ? "var(--background-button-primary)"
            : "var(--background-button-secondary)",
          border: "1px solid transparent",
          display: "flex",
          alignItems: "center",
          "@media (forced-colors: active)": {
            background: checked ? "Highlight" : "Canvas",
            borderColor: "ButtonText",
          },
        }}
      >
        <BaseView
          jss={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "var(--light-text)",
            transform: checked ? "translateX(12px)" : "none",
            boxShadow: "var(--shadow-sm)",
            transition: "transform 120ms ease",
            "@media (prefers-reduced-motion: reduce)": { transition: "none" },
            "@media (forced-colors: active)": {
              background: checked ? "HighlightText" : "ButtonText",
            },
          }}
        />
      </BaseView>
    </BaseButton>
  );
});
