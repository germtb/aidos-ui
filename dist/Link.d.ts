import React from "react";
import { Align, Justify, Gap, Size } from "./Styles";
import { BaseLinkProps } from "./BaseLink";
import { IconType } from "./IconType";
import { FlexLayoutProps } from "./FlexLayout";
import { InterctableColor } from "./Interactable";
export interface LinkProps extends BaseLinkProps {
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
export declare const Link: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>;
