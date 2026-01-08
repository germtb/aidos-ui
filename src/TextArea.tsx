import React from "react";
import { JSS, Padding, cssVar, getPadding, toClassnames } from "./jss";

export interface TextAreaProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  jss?: JSS;
  onValueChange?: (value: string) => void;
  value?: string;
  className?: undefined;
  size?: undefined;
  padding?: Padding;
}

export const TextArea = React.forwardRef(
  (
    {
      jss,
      onValueChange,
      value,
      onChange,
      padding = "medium",
      ...otherProps
    }: TextAreaProps,
    ref?: React.Ref<HTMLTextAreaElement>
  ) => {
    return (
      <textarea
        {...otherProps}
        ref={ref}
        className={toClassnames([
          {
            flexGrow: 1,
            color: cssVar("--primary-text"),
            outline: "none",
            fontSize: 20,
            lineHeight: 24 / 20,
            backgroundColor: cssVar("--overlay-background"),
            border: `1px solid ${cssVar("--divider")}`,
            borderRadius: cssVar("--border-radius-m"),
            "::placeholder": {
              color: cssVar("--subtle-text"),
            },
            ":focus-visible": {
              outline: `2px solid ${cssVar("--highlight")}`,
              outlineOffset: -2,
            },
          },
          getPadding(padding),
          jss,
        ])}
        value={value}
        onChange={
          onValueChange ? (e) => onValueChange(e.target.value) : undefined
        }
      />
    );
  }
);
