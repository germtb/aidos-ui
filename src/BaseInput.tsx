import React, { ReactNode, useId } from "react";
import { JSStyle, Size, TextColor, jss } from "./jss";
import { Label } from "./Text";

export interface BaseInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  jsStyle?: JSStyle;
  className?: undefined;
  size?: undefined;
  children?: undefined;
  id?: undefined;
  label?: string;
  labelSize?: Size;
  labelColor?: TextColor;
  labelBold?: boolean;
  labelPosition?: "start" | "end";
}

export const BaseInput = React.forwardRef(
  (
    {
      jsStyle,
      label,
      labelPosition = "end",
      labelSize,
      labelColor,
      labelBold,
      ...otherProps
    }: BaseInputProps,
    ref?: React.Ref<HTMLInputElement>
  ) => {
    const id = useId();
    const labelElement = (
      <Label
        size={labelSize}
        bold={labelBold}
        color={labelColor}
        jsStyle={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        htmlFor={id}
      >
        {label}
      </Label>
    );

    return (
      <>
        {label && labelPosition === "start" && labelElement}
        <input id={id} ref={ref} className={jss(jsStyle)} {...otherProps} />
        {label && labelPosition === "end" && labelElement}
      </>
    );
  }
);
