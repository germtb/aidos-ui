import React from "react";
import { InteractableColor } from "./Interactable";
import { JSStyle, Padding } from "./jss";
export interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    jsStyle?: JSStyle;
    color: InteractableColor;
    bare?: boolean;
    className?: undefined;
    animateInteraction?: boolean;
    padding?: Padding;
}
export declare const BaseButton: React.ForwardRefExoticComponent<BaseButtonProps & React.RefAttributes<HTMLButtonElement>>;
