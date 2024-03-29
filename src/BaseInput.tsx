import React, { ReactNode, useId } from "react";
import { JSStyle, Size, TextColor, jss } from "./jss";
import { Label } from "./Text";

export interface BaseInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  jsStyle?: JSStyle;
  className?: undefined;
  size?: undefined;
  children?: undefined;
  label?: ReactNode;
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
      id: propId,
      ...otherProps
    }: BaseInputProps,
    ref?: React.Ref<HTMLInputElement>
  ) => {
    const hookid = useId();
    const id = propId ?? hookid;
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
