/// <reference types="react" />
import { IconType } from "./IconType";
import { Size, TextColor } from "./JSS";
export declare const initializeIcons: () => void;
export declare function Icon({ icon, size, color, ariaLabel, }: {
    ariaLabel?: string;
    icon: IconType;
    size: Size;
    color: TextColor;
}): JSX.Element;
