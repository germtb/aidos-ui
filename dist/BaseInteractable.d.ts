import React from "react";
import { JSStyles, Padding } from "./Palette";
export type ButtonColor = "positive" | "secondary" | "negative";
export interface BaseInteractableProps extends React.ButtonHTMLAttributes<HTMLElement> {
    onPress?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    href?: string;
    jsStyle?: JSStyles;
    color: ButtonColor;
    bare?: boolean;
    className?: undefined;
    animateClick?: boolean;
    padding?: Padding;
}
export declare function getInteractableStyles({ color, bare, disabled, animateClick }: {
    color: any;
    bare: any;
    disabled: any;
    animateClick: any;
}): ({
    position: "relative";
    ":active": {
        opacity: number;
        top: number;
    };
    "[aria-disabled=true]:active": {
        top: number;
        opacity: number;
    };
} | {
    backgroundColor: "var(--background-button-positive)";
    "[aria-disabled=true]": {
        backgroundColor: "var(--background-button-disabled)";
    };
} | {
    backgroundColor: "var(--background-button-secondary)";
    "[aria-disabled=true]": {
        backgroundColor: "var(--background-button-disabled)";
    };
} | {
    backgroundColor: "var(--background-button-negative)";
    "[aria-disabled=true]": {
        backgroundColor: "var(--background-button-disabled)";
    };
} | {
    cursor: "default";
} | {
    backgroundColor: "inherit";
    outlineColor: "var(--outline)";
    "[aria-disabled=true]": {
        backgroundColor: "inherit";
    };
    "[aria-disabled=true]:hover": {
        backgroundColor: "inherit";
    };
} | {
    ":hover": {
        opacity: number;
    };
    "[aria-disabled=true]:hover": {
        opacity: number;
    };
})[];
export declare const BaseInteractable: React.ForwardRefExoticComponent<BaseInteractableProps & React.RefAttributes<HTMLButtonElement>>;
