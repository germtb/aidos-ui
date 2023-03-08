import React from "react";
import { ComponentName } from "./BaseView";
import { JSStyles, Padding } from "./Palette";
export type ButtonColor = "positive" | "secondary" | "negative";
export interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    componentName?: ComponentName;
    onPress: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    jsStyle?: JSStyles;
    color: ButtonColor;
    bare?: boolean;
    className?: undefined;
    animateClick?: boolean;
    padding?: Padding;
}
export declare const BaseButton: React.ForwardRefExoticComponent<BaseButtonProps & React.RefAttributes<HTMLButtonElement>>;
