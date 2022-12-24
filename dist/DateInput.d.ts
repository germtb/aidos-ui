import React, { ReactNode } from "react";
import { BaseInputProps } from "./BaseInput";
import { IconType } from "./IconType";
import { JSStyles } from "./Palette";
export interface DateInputProps extends BaseInputProps {
    onDateChange: (date: Date) => void;
    date: Date;
    icon?: IconType;
    addOn?: ReactNode;
    onChange?: undefined;
    jsStyles?: JSStyles;
}
export declare const DateInput: React.ForwardRefExoticComponent<DateInputProps & React.RefAttributes<HTMLInputElement>>;
