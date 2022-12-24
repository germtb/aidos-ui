import React from "react";
import { Align, Justify, Gap, Size, TextColor } from "./Palette";
import { BaseButtonProps, ButtonColor } from "./BaseButton";
import { IconType } from "./IconType";
import { FlexLayoutProps } from "./FlexLayout";
export interface ButtonProps extends BaseButtonProps {
    label: string;
    color: ButtonColor;
    icon?: IconType;
    iconSize?: Size;
    children?: undefined;
    iconPosition?: "left" | "right";
    rowProps?: FlexLayoutProps;
    align?: Align;
    spacing?: Gap;
    justify?: Justify;
}
export declare const getGlyphColor: (color: ButtonColor, disabled: boolean | undefined, bare: boolean | undefined) => TextColor;
export declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
