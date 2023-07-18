import React from "react";
import { InteractableColor } from "./Interactable";
import { JSStyle, Padding } from "./jss";
export interface BaseLinkProps extends React.LinkHTMLAttributes<HTMLAnchorElement> {
    onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    target?: string;
    jsStyle?: JSStyle;
    color: InteractableColor;
    href: string;
    disabled?: boolean;
    bare?: boolean;
    className?: undefined;
    animateInteraction?: boolean;
    padding?: Padding;
}
export declare const BaseLink: React.ForwardRefExoticComponent<BaseLinkProps & React.RefAttributes<HTMLAnchorElement>>;
