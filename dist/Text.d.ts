import React, { ReactNode } from "react";
import { JSStyle, Size, TextColor } from "./jss";
export type Display = "inline" | "block";
export interface TextProps {
    children: ReactNode;
    color?: TextColor;
    size?: Size;
    bold?: boolean;
    ellipsis?: boolean | "default";
    align?: "center" | "none";
    type?: TextType;
    grow?: boolean;
    jsStyle?: JSStyle;
    id?: string;
    htmlFor?: string;
}
export type TextType = "label" | "span" | "p" | "h1" | "h2" | "h3" | "h4" | "li";
export declare function Text({ children, color, size, align, bold, ellipsis, grow, type: Type, jsStyle, id, htmlFor, }: TextProps): React.JSX.Element;
export declare function Label({ size, type, ...rest }: TextProps): React.JSX.Element;
export declare function Span({ size, type, ...rest }: TextProps): React.JSX.Element;
export declare function P({ size, type, ...rest }: TextProps): React.JSX.Element;
export declare function H1({ size, type, ...rest }: TextProps): React.JSX.Element;
export declare function H2({ size, type, ...rest }: TextProps): React.JSX.Element;
export declare function H3({ size, type, ...rest }: TextProps): React.JSX.Element;
export declare function Li({ size, type, ...rest }: TextProps): React.JSX.Element;
