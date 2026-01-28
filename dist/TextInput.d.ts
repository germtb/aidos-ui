import React, { ReactNode } from "react";
import { BaseInputProps } from "./BaseInput";
import { Gap, JSS, Padding, Size } from "./jss";
export interface TextInputProps extends Omit<BaseInputProps, "size"> {
    onValueChange?: (value: string) => void;
    jssRoot?: JSS;
    addOn?: ReactNode;
    addOnPosition?: "start" | "end";
    gap?: Gap;
    onChange?: undefined;
    padding?: Padding;
    bare?: boolean;
    size?: Size;
}
export declare const TextInput: React.ForwardRefExoticComponent<TextInputProps & React.RefAttributes<HTMLInputElement>>;
