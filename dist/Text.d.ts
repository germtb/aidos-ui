import { ReactNode } from "react";
import { TextColor, Size } from "./Palette";
export declare type Display = "inline" | "block";
export interface TextProps {
    children: ReactNode;
    color?: TextColor;
    size?: Size;
    ellipsis?: boolean | "default";
    align?: "center" | "none";
    display?: Display;
    grow?: boolean;
}
export declare function Text({ children, color, size, align, ellipsis, display, grow, }: TextProps): JSX.Element;
