import React, { ReactNode } from "react";
import { BaseInputProps } from "./BaseInput";
import { Gap, Padding } from "./jss";
export interface TimeInputProps extends BaseInputProps {
    onTimeChange: (date: Date) => void;
    time: Date;
    gap?: Gap;
    padding?: Padding;
    addOn?: ReactNode;
    addOnPosition?: "start" | "end";
    onChange?: undefined;
    bare?: boolean;
}
export declare const timeFormatter: Intl.DateTimeFormat;
export declare const TimeInput: React.ForwardRefExoticComponent<TimeInputProps & React.RefAttributes<HTMLInputElement>>;
