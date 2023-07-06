import React from "react";
import { JSStyle, Padding } from "./Styles";
import { InterctableColor } from "./Interactable";
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
