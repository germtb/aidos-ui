import React from "react";
import { BaseInputProps } from "./BaseInput";
import { Gap, JSStyle, Padding } from "./jss";
export interface RangeInputProps extends BaseInputProps {
    onValueChange: (value: number) => void;
    value: number;
    rootJSStyle?: JSStyle;
    onChange?: undefined;
    padding?: Padding;
    gap?: Gap;
    addOn?: JSX.Element;
    addOnPosition?: "start" | "end";
}
export declare const RangeInput: React.ForwardRefExoticComponent<RangeInputProps & React.RefAttributes<HTMLInputElement>>;
