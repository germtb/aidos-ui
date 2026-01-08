import React from "react";
import { BaseView } from "./BaseView";
import { Icon } from "./Icon";
import { JSS, Size, cssVar } from "./jss";
import { IconType } from "./IconType";

type StaticCheckboxProps = {
  checked: boolean;
  size: Size;
  icon?: IconType;
};

const jsss: { [key: string]: JSS } = {
  border: {
    position: "absolute",
    top: "var(--spacing-xs)",
    bottom: "var(--spacing-xs)",
    left: "var(--spacing-xs)",
    right: "var(--spacing-xs)",
    border: "1px solid var(--divider)",
    borderRadius: "50%",
  },
  borderChecked: {
    border: "none",
    backgroundColor: "var(--highlight)",
  },
  icon: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: "var(--spacing-xs)",
    bottom: "var(--spacing-xs)",
    left: "var(--spacing-xs)",
    right: "var(--spacing-xs)",
  },
};

export const sizes = {
  xsmall: 20,
  small: 24,
  medium: 32,
  large: 40,
  xlarge: 48,
};

export function StaticCheckbox({
  checked,
  size,
  icon = "fa-check",
}: StaticCheckboxProps) {
  return (
    <BaseView
      jss={{
        position: "relative",
        backgroundColor: cssVar("--primary-background"),
        overflow: "hidden",
        padding: cssVar("--spacing-xs"),
        borderRadius: sizes[size] / 2,
        height: sizes[size],
        width: sizes[size],
      }}
    >
      <BaseView jss={[jsss.border, checked && jsss.borderChecked]} />
      {checked && (
        <BaseView jss={jsss.icon}>
          <Icon size={size} color="light" icon={icon} />
        </BaseView>
      )}
    </BaseView>
  );
}
