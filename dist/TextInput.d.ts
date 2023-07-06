import React, { ReactNode } from "react";
import { JSStyle, Padding } from "./Styles";
import { BaseInputProps } from "./BaseInput";
import { IconType } from "./IconType";
export interface TextInputProps extends BaseInputProps {
    onValueChange?: (value: string) => void;
    rootJSStyle?: JSStyle;
    icon?: IconType;
    addOn?: ReactNode;
    onChange?: undefined;
    indentation?: Padding;
}
export declare const TextInput: React.ForwardRefExoticComponent<TextInputProps & React.RefAttributes<HTMLInputElement>>;
