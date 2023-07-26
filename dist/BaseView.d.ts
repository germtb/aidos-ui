import React from "react";
import { JSStyle } from "./jss";
export interface BaseViewProps extends React.HTMLAttributes<HTMLElement> {
    jsStyle?: JSStyle;
    ref?: React.Ref<HTMLDivElement>;
    className?: undefined;
    grow?: boolean;
    shrink?: boolean;
    relative?: boolean;
    tag?: keyof HTMLElementTagNameMap;
}
export declare const BaseView: React.ForwardRefExoticComponent<Omit<BaseViewProps, "ref"> & React.RefAttributes<HTMLElement>>;
