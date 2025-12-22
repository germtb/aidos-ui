import React from "react";
import { JSStyle, Padding } from "./jss";
export interface TextAreaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
    jss?: JSStyle;
    onValueChange?: (value: string) => void;
    value?: string;
    className?: undefined;
    size?: undefined;
    padding?: Padding;
}
export declare const TextArea: React.ForwardRefExoticComponent<TextAreaProps & React.RefAttributes<HTMLTextAreaElement>>;
