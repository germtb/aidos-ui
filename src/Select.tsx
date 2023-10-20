import { forwardRef } from "react";
import { JSStyle, cssVar, jss } from "./jss";

export interface SelectProps extends React.HTMLAttributes<HTMLSelectElement> {
  value: string;
  onValueChange: (value: string) => void;
  jsStyle?: JSStyle;
  ref?: React.Ref<HTMLSelectElement>;
  className?: undefined;
}

export const Select = forwardRef(
  (
    { jsStyle, children, onValueChange, value, ...otherProps }: SelectProps,
    ref?: React.Ref<HTMLSelectElement>
  ) => {
    return (
      <select
        ref={ref}
        className={jss({
          fontSize: 20,
          padding: cssVar("--spacing-m"),
          border: `1px solid ${cssVar("--divider")}`,
          backgroundColor: cssVar("--overlay-background"),
          borderRadius: cssVar("--border-radius-m"),
        })}
        value={value}
        onChange={(e) => {
          onValueChange(e.target.value);
        }}
        {...otherProps}
      >
        {children}
      </select>
    );
  }
);
