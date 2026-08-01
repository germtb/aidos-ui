import React from "react";

import { BaseInput } from "./BaseInput";
import { cssVar } from "./jss";

export interface NumericInputSegmentProps {
  value: string;
  label: string;
  placeholder: string;
  length: number;
  width: string;
  id?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  invalid?: boolean;
  onValueChange: (value: string) => void;
  onComplete?: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
}

export const NumericInputSegment = React.forwardRef(
  function NumericInputSegment(
    {
      value,
      label,
      placeholder,
      length,
      width,
      id,
      disabled,
      readOnly,
      required,
      autoFocus,
      invalid,
      onValueChange,
      onComplete,
      onPrevious,
      onNext,
    }: NumericInputSegmentProps,
    ref?: React.Ref<HTMLInputElement>,
  ) {
    return (
      <BaseInput
        id={id}
        ref={ref}
        value={value}
        placeholder={placeholder}
        inputMode="numeric"
        autoComplete="off"
        maxLength={length}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        autoFocus={autoFocus}
        aria-label={label}
        aria-invalid={invalid || undefined}
        onFocus={(event) => event.currentTarget.select()}
        onMouseUp={(event) => {
          event.preventDefault();
          event.currentTarget.select();
        }}
        onKeyDown={(event) => {
          if (
            event.key === "ArrowRight" &&
            event.currentTarget.selectionStart === value.length
          ) {
            onNext?.();
          } else if (
            event.key === "ArrowLeft" &&
            event.currentTarget.selectionStart === 0
          ) {
            onPrevious?.();
          } else if (event.key === "Backspace" && value === "") {
            onPrevious?.();
          }
        }}
        onChange={(event) => {
          const nextValue = event.target.value
            .replace(/\D/g, "")
            .slice(0, length);
          onValueChange(nextValue);
          if (nextValue.length === length) onComplete?.();
        }}
        jss={{
          width,
          minWidth: 0,
          padding: `${cssVar("--spacing-m")} 0`,
          border: 0,
          outline: 0,
          background: "transparent",
          color: cssVar("--primary-text"),
          fontSize: cssVar("--font-medium"),
          lineHeight: 1.2,
          textAlign: "center",
          "::placeholder": { color: cssVar("--subtle-text") },
          ":disabled": { color: cssVar("--subtle-text") },
        }}
      />
    );
  },
);
