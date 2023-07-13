import React from "react";
import { InterctableColor } from "./Interactable";
import { JSStyle, Padding } from "./jss";
export interface BaseLinkProps extends React.LinkHTMLAttributes<HTMLAnchorElement> {
    onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    target?: string;
    jsStyle?: JSStyle;
    color: InterctableColor;
    href: string;
    disabled?: boolean;
    bare?: boolean;
    className?: undefined;
    animateInteraction?: boolean;
    padding?: Padding;
}
export declare const BaseLink: React.ForwardRefExoticComponent<BaseLinkProps & React.RefAttributes<HTMLAnchorElement>>;
