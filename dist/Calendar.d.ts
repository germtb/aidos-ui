import React from "react";
import { JSS } from "./jss";
export declare const Calendar: React.ForwardRefExoticComponent<{
    date: Date;
    header: (props: {
        weekday: string;
    }) => JSX.Element;
    jss?: JSS;
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
