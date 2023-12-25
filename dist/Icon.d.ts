import React from "react";
import { IconType } from "./IconType";
import { Size, TextColor } from "./jss";
export declare function IconProvider({ children }: {
    children: JSX.Element;
}): JSX.Element;
export declare function Icon({ icon, size, color, ariaLabel, }: {
    ariaLabel?: string;
    icon: IconType;
    size: Size;
    color: TextColor;
}): React.JSX.Element;
