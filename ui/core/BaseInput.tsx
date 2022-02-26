import React from "react";
import { createClassNames, JSStyles } from "./Palette";

export interface BaseInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  componentName?: string;
  jsStyle?: JSStyles;
  className?: undefined;
  size?: undefined;
}

function BaseInput(
  { jsStyle, componentName, ...otherProps }: BaseInputProps,
  ref?: React.Ref<HTMLInputElement>
) {
  return (
    <input
      data-test-id={componentName ?? "BaseInput"}
      ref={ref}
      className={createClassNames(jsStyle)}
      {...otherProps}
    />
  );
}

export default React.forwardRef(BaseInput);
