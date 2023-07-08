import React, { ReactNode } from "react";
import { BaseInputProps } from "./BaseInput";
import { IconType } from "./IconType";
import { JSStyle, Padding } from "./jss";
export interface TextInputProps extends BaseInputProps {
    onValueChange?: (value: string) => void;
    rootJSStyle?: JSStyle;
    icon?: IconType;
    addOn?: ReactNode;
    onChange?: undefined;
    indentation?: Padding;
}
export declare const TextInput: React.ForwardRefExoticComponent<TextInputProps & React.RefAttributes<HTMLInputElement>>;
