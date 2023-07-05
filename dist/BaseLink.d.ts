import React from "react";
import { JSStyles, Padding } from "./Palette";
import { InterctableColor } from "./Interactable";
export interface BaseLinkProps extends React.LinkHTMLAttributes<HTMLAnchorElement> {
    onPress?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    jsStyle?: JSStyles;
    color: InterctableColor;
    disabled?: boolean;
    bare?: boolean;
    className?: undefined;
    animateInteraction?: boolean;
    padding?: Padding;
}
export declare const BaseLink: React.ForwardRefExoticComponent<BaseLinkProps & React.RefAttributes<HTMLAnchorElement>>;
