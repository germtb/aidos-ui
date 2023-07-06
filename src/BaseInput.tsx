import React, { ReactNode, useId, useMemo } from "react";
import { createClassNames, JSStyles } from "./Styles";

export interface BaseInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  jsStyle?: JSStyles;
  className?: undefined;
  size?: undefined;
  children?: undefined;
  id?: undefined;
  labelContent?: ReactNode;
}

export const BaseInput = React.forwardRef(
  (
    { jsStyle, labelContent, ...otherProps }: BaseInputProps,
    ref?: React.Ref<HTMLInputElement>
  ) => {
    const id = useId();

    return (
      <>
        {labelContent && <label htmlFor={id}>{labelContent}</label>}
        <input
          id={id}
          ref={ref}
          className={createClassNames(jsStyle)}
          {...otherProps}
        />
      </>
    );
  }
);
