import React from "react";
import { BaseView } from "./BaseView";
import { Icon } from "./Icon";
import { Size, cssVar } from "./jss";
import { IconType } from "./IconType";

type StaticCheckboxProps = {
  checked: boolean;
  size: Size;
  icon?: IconType;
};

export const sizes = {
  xsmall: 20,
  small: 24,
  medium: 32,
  large: 40,
  xlarge: 48,
  xxlarge: 56,
  xxxlarge: 64,
};

export function StaticCheckbox({
  checked,
  size,
  icon = "check",
}: StaticCheckboxProps) {
  const control = sizes[size] / 2 + 4;
  return (
    <BaseView
      aria-hidden
      jss={{
        display: "grid",
        placeItems: "center",
        flexShrink: 0,
        height: sizes[size],
        width: sizes[size],
      }}
    >
      <BaseView
        data-aidos-checkbox
        jss={{
          display: "grid",
          placeItems: "center",
          height: control,
          width: control,
          borderRadius: Math.round(control / 5),
          border: "1px solid transparent",
          borderColor: checked
            ? cssVar("--background-button-primary")
            : "color-mix(in srgb, var(--primary-text) 50%, transparent)",
          backgroundColor: checked
            ? cssVar("--background-button-primary")
            : "transparent",
          color: cssVar("--light-text"),
          "@media (forced-colors: active)": {
            backgroundColor: checked ? "Highlight" : "Canvas",
            borderColor: checked ? "Highlight" : "ButtonText",
            color: "HighlightText",
          },
        }}
      >
        {checked &&
          (icon === "check" ? (
            <svg
              width={control - 2}
              height={control - 2}
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="m3.5 8 3 3 6-6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <Icon
              size="small"
              color="inherit"
              icon={icon}
              jss={{ width: control - 4, height: control - 4 }}
            />
          ))}
      </BaseView>
    </BaseView>
  );
}
