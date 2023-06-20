import React, { ReactNode } from "react";
import { JSStyles } from "./Palette";
export interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    jsStyle?: JSStyles;
    className?: undefined;
    size?: undefined;
    children?: undefined;
    id?: undefined;
    labelContent?: ReactNode;
}
export declare const BaseInput: React.ForwardRefExoticComponent<BaseInputProps & React.RefAttributes<HTMLInputElement>>;
