import React from "react";
import { BaseView } from "./BaseView";
import { Icon } from "./Icon";
import { JSStyle, Size } from "./jss";
import { IconType } from "./IconType";

type StaticCheckboxProps = {
  checked: boolean;
  size: Size;
  icon?: IconType;
};

const jsStyles: { [key: string]: JSStyle } = {
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

const sizes = {
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
      jsStyle={{
        position: "relative",
        backgroundColor: "var(--primary-background)",
        overflow: "hidden",
        padding: "var(--spacing-xs)",
        borderRadius: sizes[size] / 2,
        height: sizes[size],
        width: sizes[size],
      }}
    >
      <BaseView
        jsStyle={[jsStyles.border, checked && jsStyles.borderChecked]}
      />
      {checked && (
        <BaseView jsStyle={jsStyles.icon}>
          <Icon size={size} color="light" icon={icon} />
        </BaseView>
      )}
    </BaseView>
  );
}
