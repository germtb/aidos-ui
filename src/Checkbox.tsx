import React from "react";
import { BaseInput, BaseInputProps } from "./BaseInput";
import { Size, toClassnames } from "./jss";
import { StaticCheckbox, sizes } from "./StaticCheckbox";

interface CheckboxProps extends Omit<
  BaseInputProps,
  "checked" | "onClick" | "value" | "onChange" | "size"
> {
  checked: boolean;
  onClick: () => void;
  size: Size;
  value?: undefined;
  onChange?: undefined;
}

export function Checkbox({
  checked,
  onClick,
  size,
  ...inputProps
}: CheckboxProps) {
  return (
    <label
      className={toClassnames({
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: sizes[size],
        width: sizes[size],
        flexShrink: 0,
        ":has(input:focus-visible) [data-aidos-checkbox]": {
          outline: "2px solid var(--outline)",
          outlineOffset: 2,
        },
        ":has(input:disabled)": { opacity: 0.5 },
      })}
    >
      <StaticCheckbox checked={checked} size={size} />
      <BaseInput
        {...inputProps}
        type="checkbox"
        role="checkbox"
        aria-checked={checked}
        tabIndex={0}
        checked={checked}
        onChange={onClick}
        jss={{
          position: "absolute",
          margin: 0,
          outline: "none",
          opacity: 0,
          cursor: inputProps.disabled ? "default" : "pointer",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </label>
  );
}
