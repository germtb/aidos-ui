import React, { ReactNode } from "react";
import { BaseInputProps } from "./BaseInput";
import { Gap, JSStyle, Padding } from "./jss";
export interface TextInputProps extends BaseInputProps {
    onValueChange?: (value: string) => void;
    rootJSStyle?: JSStyle;
    addOn?: ReactNode;
    addOnPosition?: "start" | "end";
    gap?: Gap;
    onChange?: undefined;
    padding?: Padding;
    bare?: boolean;
}
export declare const TextInput: React.ForwardRefExoticComponent<TextInputProps & React.RefAttributes<HTMLInputElement>>;
