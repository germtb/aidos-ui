import React, { ReactNode, useId } from "react";
import { JSS, Size, TextColor, toClassnames } from "./jss";
import { Label } from "./Text";

export interface BaseInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  jss?: JSS;
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
      jss,
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
        jss={{
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
        <input
          id={id}
          ref={ref}
          className={toClassnames(jss)}
          {...otherProps}
        />
        {label && labelPosition === "end" && labelElement}
      </>
    );
  }
);
