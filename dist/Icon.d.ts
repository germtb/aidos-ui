/// <reference types="react" />
import { Size, TextColor } from "./Styles";
import { IconType } from "./IconType";
export declare const initializeIcons: () => void;
export declare function Icon({ icon, size, color, ariaLabel, }: {
    ariaLabel?: string;
    icon: IconType;
    size: Size;
    color: TextColor;
}): JSX.Element;
