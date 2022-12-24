import React from "react";
import { JSStyles } from "./Palette";
export declare const Calendar: React.ForwardRefExoticComponent<{
    date: Date;
    header: (props: {
        weekday: string;
    }) => JSX.Element;
    jsStyle?: JSStyles;
    cell: (props: {
        today?: boolean;
        date: Date;
        outOfMonth: boolean;
        top: boolean;
        left: boolean;
        right: boolean;
        bottom: boolean;
    }) => JSX.Element;
} & React.RefAttributes<HTMLElement>>;
