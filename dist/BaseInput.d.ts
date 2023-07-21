import React, { ReactNode } from "react";
import { JSStyle, Size, TextColor } from "./jss";
export interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    jsStyle?: JSStyle;
    className?: undefined;
    size?: undefined;
    children?: undefined;
    id?: undefined;
    label?: ReactNode;
    labelSize?: Size;
    labelColor?: TextColor;
    labelBold?: boolean;
    labelPosition?: "start" | "end";
}
export declare const BaseInput: React.ForwardRefExoticComponent<BaseInputProps & React.RefAttributes<HTMLInputElement>>;
