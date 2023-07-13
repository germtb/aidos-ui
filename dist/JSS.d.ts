/// <reference types="react" />
import CSS from "csstype";
export type Styles = CSS.Properties<string | number | CSS.Properties<string | number>>;
export type JSStyle = Styles | null | false | undefined | {
    [key: string]: Styles;
} | Array<JSStyle>;
export declare const jss: (jsStyle: JSStyle) => string;
export declare function JSStylesProvider({ themes, children, }: {
    themes: {
        dark: Theme;
        light: Theme;
    };
    children: JSX.Element;
}): JSX.Element;
export declare function JSServerStyles(): JSX.Element;
export type Size = "xsmall" | "small" | "medium" | "large" | "xlarge";
export type Spacing = "none" | Size;
export type Gap = Spacing;
export type Padding = Spacing | [Spacing, Spacing];
export type Margin = Spacing | [Spacing, Spacing];
export type Direction = "horizontal" | "vertical";
export type Position = "start" | "end";
export type Justify = "none" | "center" | "flex-start" | "space-between" | "flex-end" | "stretch";
export type Align = "none" | "center" | "stretch" | "flex-start" | "flex-end";
export type FlexDirection = "row" | "column";
export type Color = "none" | "negative" | "warning" | "highlight" | "primary-background" | "secondary-background" | "divider" | "inherit";
export type TextColor = "primary" | "secondary" | "highlight" | "negative" | "subtle" | "light" | "inherit";
export declare function cssVar(string: keyof Theme): string;
export declare function getSize(size: Size): string;
export declare function getSpacing(spacing: Spacing): string;
export declare function getPadding(padding: Padding): string;
export type Theme = {
    ["--overlay-background"]: string;
    ["--primary-background"]: string;
    ["--secondary-background"]: string;
    ["--divider"]: string;
    ["--strong-divider"]: string;
    ["--pressed-background"]: string;
    ["--hovered-background"]: string;
    ["--selected-background"]: string;
    ["--nav-bar"]: string;
    ["--warning"]: string;
    ["--highlight"]: string;
    ["--outline"]: string;
    ["--light-highlight"]: string;
    ["--primary-text"]: string;
    ["--secondary-text"]: string;
    ["--subtle-text"]: string;
    ["--highlight-text"]: string;
    ["--negative-text"]: string;
    ["--light-text"]: string;
    ["--background-button-positive"]: string;
    ["--background-button-secondary"]: string;
    ["--background-button-negative"]: string;
    ["--background-button-disabled"]: string;
    ["--spacing-xs"]: string;
    ["--spacing-s"]: string;
    ["--spacing-m"]: string;
    ["--spacing-l"]: string;
    ["--spacing-xl"]: string;
    ["--spacing-xxl"]: string;
    ["--spacing-xxxl"]: string;
    ["--border-radius-s"]: string;
    ["--border-radius-m"]: string;
    ["--border-radius-l"]: string;
    ["--nav-bar-height"]: string;
};
export declare const lightTheme: Theme;
export declare const darkTheme: Theme;
export declare const baseStyles = "\n* {\n  box-sizing: border-box;\n  border: none;\n  touch-action: manipulation;\n  font-family: sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n*:focus {\n  outline-color: var(--highlight);\n}\n\nhtml,\nbody {\n  margin: 0;\n  height: 100%;\n  width: 100%;\n  overflow: hidden;\n  background-color: var(--primary-background);\n}\n\n";
export declare const getBackground: (color: Color) => JSStyle;
export declare const MOBILE = 750;
export declare const TABLET = 1000;
export declare const LAPTOP = 1200;
export declare const withMedia: (styles: {
    phone?: JSStyle;
    tablet?: JSStyle;
    laptop?: JSStyle;
    desktop?: JSStyle;
}) => JSStyle;
export declare const getTextColor: (color: TextColor) => {
    color: string;
} | {
    color: string;
} | {
    color: string;
} | {
    color: string;
} | {
    color: string;
} | {
    color: string;
} | {
    color: string;
};
export declare function getBaseStyles(themes: {
    light: Theme;
    dark: Theme;
}): string[];
