import React, { ReactNode } from "react";
import { BaseInputProps } from "./BaseInput";
import { IconType } from "./IconType";
import { JSS } from "./jss";
export interface DatetimeInputProps extends BaseInputProps {
    onDateChange: (date: Date) => void;
    date: Date;
    icon?: IconType;
    addOn?: ReactNode;
    onChange?: undefined;
    jss?: JSS;
}
export declare const DatetimeInput: React.ForwardRefExoticComponent<DatetimeInputProps & React.RefAttributes<HTMLInputElement>>;
