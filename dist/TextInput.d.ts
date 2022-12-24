import React, { ReactNode } from "react";
import { JSStyles, Padding } from "./Palette";
import { BaseInputProps } from "./BaseInput";
import { IconType } from "./IconType";
export interface TextInputProps extends BaseInputProps {
    onValueChange: (value: string) => void;
    rootJSStyle?: JSStyles;
    icon?: IconType;
    addOn?: ReactNode;
    onChange?: undefined;
    indentation?: Padding;
}
export declare const TextInput: React.ForwardRefExoticComponent<TextInputProps & React.RefAttributes<HTMLInputElement>>;
