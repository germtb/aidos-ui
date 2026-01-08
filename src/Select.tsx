import { forwardRef } from "react";
import { JSS, cssVar, toClassnames } from "./jss";

export interface SelectProps extends React.HTMLAttributes<HTMLSelectElement> {
  value: string;
  onValueChange: (value: string) => void;
  jss?: JSS;
  ref?: React.Ref<HTMLSelectElement>;
  className?: undefined;
}

export const Select = forwardRef(
  (
    { jss, children, onValueChange, value, ...otherProps }: SelectProps,
    ref?: React.Ref<HTMLSelectElement>
  ) => {
    return (
      <select
        ref={ref}
        className={toClassnames([
          {
            fontSize: 20,
            border: `1px solid ${cssVar("--divider")}`,
            backgroundColor: cssVar("--overlay-background"),
            borderRadius: cssVar("--border-radius-m"),
          },
          jss,
        ])}
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
