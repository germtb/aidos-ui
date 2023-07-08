import React, { ReactNode, useId } from "react";
import { JSStyle, jss } from "./jss";

export interface BaseInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  jsStyle?: JSStyle;
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
        <input id={id} ref={ref} className={jss(jsStyle)} {...otherProps} />
      </>
    );
  }
);
