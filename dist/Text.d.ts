import { ReactNode } from "react";
import { TextColor, Size } from "./Palette";
export type Display = "inline" | "block";
export interface TextProps {
    children: ReactNode;
    color?: TextColor;
    size?: Size;
    ellipsis?: boolean | "default";
    align?: "center" | "none";
    type?: TextType;
    grow?: boolean;
    header?: 1 | 2 | 3 | 4;
}
export type TextType = "span" | "p" | "h1" | "h2" | "h3" | "h4";
export declare function Text({ children, color, size, align, ellipsis, grow, type: Type, }: TextProps): JSX.Element;
