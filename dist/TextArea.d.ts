import React from "react";
import { JSStyle } from "./JSS";
export interface TextAreaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
    jsStyle?: JSStyle;
    onValueChange?: (value: string) => void;
    value?: string;
    className?: undefined;
    size?: undefined;
}
export declare const TextArea: React.ForwardRefExoticComponent<TextAreaProps & React.RefAttributes<HTMLTextAreaElement>>;
