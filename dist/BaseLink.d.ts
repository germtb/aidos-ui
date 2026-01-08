import React from "react";
import { InteractableColor } from "./Interactable";
import { JSS, Padding } from "./jss";
export interface BaseLinkProps extends React.LinkHTMLAttributes<HTMLAnchorElement> {
    onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    target?: string;
    jss?: JSS;
    color: InteractableColor;
    href: string;
    disabled?: boolean;
    bare?: boolean;
    border?: boolean;
    className?: undefined;
    animateInteraction?: boolean;
    padding?: Padding;
}
export declare const BaseLinkComponentOverrideContext: React.Context<(props: any) => import("react/jsx-runtime").JSX.Element>;
export declare const BaseLink: React.ForwardRefExoticComponent<BaseLinkProps & React.RefAttributes<HTMLAnchorElement>>;
