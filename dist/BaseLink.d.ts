import React from "react";
import { InterctableColor } from "./Interactable";
import { JSStyle, Padding } from "./jss";
export interface BaseLinkProps extends React.LinkHTMLAttributes<HTMLAnchorElement> {
    onPress?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    jsStyle?: JSStyle;
    color: InterctableColor;
    disabled?: boolean;
    bare?: boolean;
    className?: undefined;
    animateInteraction?: boolean;
    padding?: Padding;
}
export declare const BaseLink: React.ForwardRefExoticComponent<BaseLinkProps & React.RefAttributes<HTMLAnchorElement>>;
