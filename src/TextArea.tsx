import React from "react";
import { JSStyle, jss } from "./jss2";

export interface TextAreaProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  jsStyle?: JSStyle;
  onValueChange?: (value: string) => void;
  value?: string;
  className?: undefined;
  size?: undefined;
}

export const TextArea = React.forwardRef(
  (
    { jsStyle, onValueChange, value, onChange, ...otherProps }: TextAreaProps,
    ref?: React.Ref<HTMLTextAreaElement>
  ) => {
    return (
      <textarea
        {...otherProps}
        ref={ref}
        className={jss([
          {
            padding: "var(--spacing-m)",
            flexGrow: 1,
            backgroundColor: "var(--primary-background)",
            color: "var(--primary-text)",
            outline: "none",
            border: "none",
            fontSize: 20,
            lineHeight: 24 / 20,
            "::placeholder": {
              color: "var(--secondary-text);",
            },
          },
          jsStyle,
        ])}
        value={value}
        onChange={
          onValueChange ? (e) => onValueChange(e.target.value) : undefined
        }
      />
    );
  }
);
