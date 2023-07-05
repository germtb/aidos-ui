import React from "react";
import { Align, Justify, Gap, Size } from "./Palette";
import { BaseButtonProps } from "./BaseButton";
import { IconType } from "./IconType";
import { FlexLayoutProps } from "./FlexLayout";
import { InterctableColor } from "./Interactable";
export interface ButtonProps extends BaseButtonProps {
    label: string;
    color: InterctableColor;
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
