import React from "react";
import { JSS } from "./jss";
export interface BaseViewProps extends React.HTMLAttributes<HTMLElement> {
    jss?: JSS;
    ref?: React.Ref<HTMLDivElement>;
    className?: undefined;
    grow?: boolean;
    shrink?: boolean;
    relative?: boolean;
    tag?: keyof HTMLElementTagNameMap;
}
export declare const BaseView: React.ForwardRefExoticComponent<Omit<BaseViewProps, "ref"> & React.RefAttributes<HTMLElement>>;
