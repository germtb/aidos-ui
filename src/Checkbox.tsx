import React from "react";
import BaseInput, { BaseInputProps } from "./BaseInput";
import { createJSStyles, createClassNames, Size } from "./Palette";
import BaseView from "./BaseView";
import Icon from "./Icon";

// @ts-ignore
interface CheckboxProps extends BaseInputProps {
  checked: boolean;
  onValueChange: (value: boolean) => void;
  size: Size;
  value?: undefined;
  onChange?: undefined;
}

const jsStyles = createJSStyles({
  root: {
    position: "relative",
    backgroundColor: "var(--primary-background)",
    overflow: "hidden",
    padding: "var(--spacing-xs)",
    ":active": {
      backgroundColor: "var(--light-highlight)",
      border: "1px solid var(--highlight)",
      transform: "scale(0.92)",
    },
    ":focus-within": {
      border: "2px solid var(--highlight)",
    },
  },
  rootChecked: {
    ":active": {
      opacity: "0.9",
    },
  },
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
  small: {
    borderRadius: 12,
    height: 24,
    width: 24,
  },
  medium: {
    borderRadius: 16,
    height: 32,
    width: 32,
  },
  large: {
    borderRadius: 20,
    height: 40,
    width: 40,
  },
  input: {
    position: "absolute",
    opacity: 0,
    cursor: "pointer",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "100%",
  },
});

export default function Checkbox({
  jsStyle,
  checked,
  onValueChange,
  size,
  ...inputProps
}: CheckboxProps) {
  return (
    <label
      className={createClassNames(
        jsStyles.root,
        size === "small" && jsStyles.small,
        size === "medium" && jsStyles.medium,
        size === "large" && jsStyles.large,
        checked && jsStyles.rootChecked
      )}
    >
      <BaseView
        jsStyle={[jsStyles.border, checked && jsStyles.borderChecked]}
      />
      <BaseInput
        {...inputProps}
        type="checkbox"
        role="checkbox"
        aria-checked={`${checked}`}
        tabIndex={0}
        checked={checked}
        onChange={(e) => onValueChange(e.target.checked)}
        jsStyle={[jsStyles.input, jsStyle]}
      />
      {checked && (
        <BaseView jsStyle={jsStyles.icon}>
          <Icon size={size} color="light" icon="fa-check" />
        </BaseView>
      )}
    </label>
  );
}
