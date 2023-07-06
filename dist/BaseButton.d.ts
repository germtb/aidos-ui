import React from "react";
import { JSStyle, Padding } from "./Styles";
import { InterctableColor } from "./Interactable";
export interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onPress: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    jsStyle?: JSStyle;
    color: InterctableColor;
    bare?: boolean;
    className?: undefined;
    animateInteraction?: boolean;
    padding?: Padding;
}
export declare const BaseButton: React.ForwardRefExoticComponent<BaseButtonProps & React.RefAttributes<HTMLButtonElement>>;
