import { controlSizes } from "./controlSize";
import React, { ReactNode } from "react";
import { BaseInput, BaseInputProps } from "./BaseInput";
import { Column } from "./Column";
import { InputFrame } from "./InputFrame";
import { Gap, JSS, Padding, Size, cssVar, getPadding } from "./jss";
import { getTypography } from "./typography";

export interface TextInputProps extends Omit<BaseInputProps, "size"> {
  onValueChange?: (value: string) => void;
  jssRoot?: JSS;
  addOn?: ReactNode;
  addOnPosition?: "start" | "end";
  gap?: Gap;
  onChange?: undefined;
  padding?: Padding;
  size?: Size;
}

export const TextInput = React.forwardRef(function TextInput(
  {
    value,
    onValueChange,
    jssRoot,
    jss,
    addOn,
    gap,
    addOnPosition = "start",
    padding,
    size = "medium",
    ...inputProps
  }: TextInputProps,
  ref?: React.Ref<HTMLInputElement>,
) {
  const metrics = controlSizes[size];
  const inputPadding =
    padding != null
      ? getPadding(padding)
      : { padding: `0 ${metrics?.padding ?? 8}px` };
  return (
    <InputFrame
      gap={gap ?? (size === "xsmall" || size === "small" ? "small" : "medium")}
      jss={jssRoot}
    >
      {addOnPosition === "start" && addOn && (
        <Column
          justify="center"
          align="center"
          jss={[
            padding != null
              ? getPadding(padding)
              : { paddingLeft: metrics?.padding ?? 8 },
            { paddingRight: 0, flexShrink: 0 },
          ]}
        >
          {addOn}
        </Column>
      )}
      <BaseInput
        {...inputProps}
        ref={ref}
        value={value}
        onChange={
          onValueChange ? (e) => onValueChange(e.target.value) : undefined
        }
        jss={[
          {
            minWidth: 0,
            minHeight: metrics ? metrics.height - 2 : undefined,
            flexGrow: 1,
            backgroundColor: "transparent",
            color: cssVar("--primary-text"),
            outline: "none",
            border: "none",
            ...getTypography(metrics?.text ?? size),
            "::placeholder": {
              color: cssVar("--subtle-text"),
            },
            ":disabled": {
              color: cssVar("--subtle-text"),
              cursor: "not-allowed",
            },
            "[aria-invalid=true]": {
              color: cssVar("--negative-text"),
            },
          },
          inputPadding,
          addOn && addOnPosition === "start" ? { paddingLeft: 0 } : null,
          addOn && addOnPosition === "end" ? { paddingRight: 0 } : null,
          jss,
        ]}
      />
      {addOnPosition === "end" && addOn && (
        <Column
          justify="center"
          align="center"
          jss={[
            padding != null
              ? getPadding(padding)
              : { paddingRight: metrics?.padding ?? 8 },
            { paddingLeft: 0, flexShrink: 0 },
          ]}
        >
          {addOn}
        </Column>
      )}
    </InputFrame>
  );
});
