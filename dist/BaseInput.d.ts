import React, { ReactNode } from "react";
import { JSS, Size, TextColor } from "./jss";
export interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
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
export declare const BaseInput: React.ForwardRefExoticComponent<BaseInputProps & React.RefAttributes<HTMLInputElement>>;
