import React, { ReactNode, useMemo } from "react";
import { guid } from "./guid";
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
    const id = useMemo(() => guid(), []);
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
