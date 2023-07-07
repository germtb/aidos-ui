import React, { ReactNode } from "react";
import { JSStyle } from "./JSS";
export interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    jsStyle?: JSStyle;
    className?: undefined;
    size?: undefined;
    children?: undefined;
    id?: undefined;
    labelContent?: ReactNode;
}
export declare const BaseInput: React.ForwardRefExoticComponent<BaseInputProps & React.RefAttributes<HTMLInputElement>>;
