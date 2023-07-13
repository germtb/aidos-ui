import React from "react";
import { IconType } from "./IconType";
import { Size } from "./jss";
import { BaseLinkProps } from "./BaseLink";
export interface IconLinkProps extends BaseLinkProps {
    icon: IconType;
    size: Size;
}
export declare const IconLink: React.ForwardRefExoticComponent<IconLinkProps & React.RefAttributes<HTMLAnchorElement>>;
