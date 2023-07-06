import React from "react";
import { JSStyles } from "./Styles";
export interface TextAreaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
    jsStyle?: JSStyles;
    onValueChange?: (value: string) => void;
    value?: string;
    className?: undefined;
    size?: undefined;
}
export declare const TextArea: React.ForwardRefExoticComponent<TextAreaProps & React.RefAttributes<HTMLTextAreaElement>>;
