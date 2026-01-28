import CSS from "csstype";
import React from "react";
export type Styles = CSS.Properties<string | number | CSS.Properties<string | number>>;
export type JSS = Styles | null | false | undefined | {
    [key: string]: Styles;
} | Array<JSS>;
export declare const toClassnames: (jss: JSS) => string;
export declare function JSSProvider({ themes, children, }: {
    themes: {
        dark: Theme;
        light: Theme;
    };
    children: React.JSX.Element;
}): import("react/jsx-runtime").JSX.Element;
export declare function JSServerStyles(): import("react/jsx-runtime").JSX.Element;
export type Size = "xsmall" | "small" | "medium" | "large" | "xlarge" | "xxlarge" | "xxxlarge";
export type Spacing = "none" | Size;
export type Gap = Spacing;
export type Padding = Spacing | [Spacing, Spacing];
export type Margin = Spacing | [Spacing, Spacing];
export type Direction = "horizontal" | "vertical";
export type Position = "start" | "end";
export type Justify = "none" | "center" | "flex-start" | "space-between" | "flex-end" | "stretch";
export type Align = "none" | "center" | "stretch" | "flex-start" | "flex-end";
export type FlexDirection = "row" | "column";
export type Color = "none" | "light" | "dark" | "negative" | "warning" | "highlight" | "primary-background" | "secondary-background" | "divider" | "inherit";
export type TextColor = "primary" | "secondary" | "highlight" | "negative" | "subtle" | "light" | "inherit";
export declare function cssVar(string: keyof Theme): string;
export declare function getSize(size: Size): string;
export declare function getSpacing(spacing: Spacing): string;
export declare function getPadding(padding: Padding): JSS;
export declare function getMargin(margin: Margin): JSS;
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
    ["--font-xsmall"]: string;
    ["--font-small"]: string;
    ["--font-medium"]: string;
    ["--font-large"]: string;
    ["--font-xlarge"]: string;
    ["--font-xxlarge"]: string;
    ["--font-xxxlarge"]: string;
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
    ["--shadow-sm"]: string;
    ["--shadow-md"]: string;
    ["--shadow-lg"]: string;
    ["--transition-fast"]: string;
    ["--transition-normal"]: string;
};
export declare const lightTheme: Theme;
export declare const darkTheme: Theme;
export declare const baseStyles: string;
export declare const getBackground: (color: Color) => JSS;
export declare const MOBILE = 750;
export declare const TABLET = 1000;
export declare const LAPTOP = 1200;
export declare const MOBILE_MEDIA = "@media (min-width: 0px) and (max-width: 750px)";
export declare const TABLET_MEDIA = "@media (min-width: 750px) and (max-width: 1000px)";
export declare const LAPTOP_MEDIA = "@media (min-width: 1000px) and (max-width: 1200px)";
export declare const DESKTOP_MEDIA = "@media (min-width: 1200px)";
export declare function mobile(jss: JSS): {
    [key: string]: JSS;
};
export declare function tablet(jss: JSS): {
    [key: string]: JSS;
};
export declare function laptop(jss: JSS): {
    [key: string]: JSS;
};
export declare function desktop(jss: JSS): {
    [key: string]: JSS;
};
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
