import React from "react";
import { BaseButtonProps } from "./BaseButton";
import { Size } from "./Palette";
import { IconType } from "./IconType";
export interface IconButtonProps extends BaseButtonProps {
    icon: IconType;
    size: Size;
}
export declare const IconButton: React.ForwardRefExoticComponent<IconButtonProps & React.RefAttributes<HTMLButtonElement>>;
