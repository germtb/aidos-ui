import React from "react";
import { BaseButtonProps } from "./BaseButton";
import { IconType } from "./IconType";
import { FlexLayoutProps } from "./FlexLayout";
import { InteractableColor } from "./Interactable";
import { Align, Gap, Justify, Size } from "./jss";
export interface ButtonProps extends BaseButtonProps {
    label: string;
    color: InteractableColor;
    size?: Size;
    icon?: IconType;
    iconSize?: Size;
    children?: undefined;
    iconPosition?: "left" | "right";
    rowProps?: FlexLayoutProps;
    align?: Align;
    gap?: Gap;
    justify?: Justify;
}
export declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
