import React, { ReactNode, useId, useMemo } from "react";
import { createClassNames, JSStyles } from "./Palette";

export interface BaseInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  componentName?: string;
  jsStyle?: JSStyles;
  className?: undefined;
  size?: undefined;
  children?: undefined;
  id?: undefined;
  labelContent?: ReactNode;
}

export const BaseInput = React.forwardRef(
  (
    { jsStyle, componentName, labelContent, ...otherProps }: BaseInputProps,
    ref?: React.Ref<HTMLInputElement>
  ) => {
    const id = useId();

    return (
      <>
        {labelContent && <label htmlFor={id}>{labelContent}</label>}
        <input
          id={id}
          data-test-id={componentName ?? "BaseInput"}
          ref={ref}
          className={createClassNames(jsStyle)}
          {...otherProps}
        />
      </>
    );
  }
);
