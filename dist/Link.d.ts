import React, { ReactNode } from "react";
import { BaseLinkProps } from "./BaseLink";
import { IconType } from "./IconType";
import { FlexLayoutProps } from "./FlexLayout";
import { InteractableColor } from "./Interactable";
import { Size, Align, Gap, Justify } from "./jss";
export interface LinkProps extends BaseLinkProps {
    children?: ReactNode;
    color: InteractableColor;
    size?: Size;
    icon?: IconType;
    underline?: boolean;
    iconSize?: Size;
    iconPosition?: "left" | "right";
    rowProps?: FlexLayoutProps;
    align?: Align;
    gap?: Gap;
    justify?: Justify;
    bold?: boolean;
    inline?: boolean;
}
export declare const Link: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>;
