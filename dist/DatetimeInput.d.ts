import React, { ReactNode } from "react";
import { BaseInputProps } from "./BaseInput";
import { IconType } from "./IconType";
import { JSStyle } from "./Styles";
export interface DatetimeInputProps extends BaseInputProps {
    onDateChange: (date: Date) => void;
    date: Date;
    icon?: IconType;
    addOn?: ReactNode;
    onChange?: undefined;
    jsStyle?: JSStyle;
}
export declare const DatetimeInput: React.ForwardRefExoticComponent<DatetimeInputProps & React.RefAttributes<HTMLInputElement>>;
