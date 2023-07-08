import React from "react";
import { IconType } from "./IconType";
import { Size } from "./jss";
import { BaseLinkProps } from "./BaseLink";
export interface IconButtonProps extends BaseLinkProps {
    icon: IconType;
    size: Size;
}
export declare const IconButton: React.ForwardRefExoticComponent<IconButtonProps & React.RefAttributes<HTMLAnchorElement>>;
