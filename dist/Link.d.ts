import React from "react";
import { BaseLinkProps } from "./BaseLink";
import { IconType } from "./IconType";
import { FlexLayoutProps } from "./FlexLayout";
import { InterctableColor } from "./Interactable";
import { Size, Align, Gap, Justify } from "./jss";
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
