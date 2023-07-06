import React, { ReactNode } from "react";
import { BaseInputProps } from "./BaseInput";
import { IconType } from "./IconType";
export interface TimeInputProps extends BaseInputProps {
    onTimeChange: (date: Date) => void;
    time: Date;
    icon?: IconType;
    addOn?: ReactNode;
    onChange?: undefined;
}
export declare const timeFormatter: Intl.DateTimeFormat;
export declare const TimeInput: React.ForwardRefExoticComponent<TimeInputProps & React.RefAttributes<HTMLInputElement>>;
