import React from "react";
import { BaseButtonProps } from "./BaseButton";
import { IconType } from "./IconType";
import { Size } from "./JSS";
export interface IconButtonProps extends BaseButtonProps {
    icon: IconType;
    size: Size;
}
export declare const IconButton: React.ForwardRefExoticComponent<IconButtonProps & React.RefAttributes<HTMLButtonElement>>;
