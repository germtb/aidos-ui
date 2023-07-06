import CSS from "csstype";
import { ReactNode } from "react";
export type Size = "xsmall" | "small" | "medium" | "large" | "xlarge";
export type Spacing = "none" | Size;
export type Gap = Spacing;
export type Padding = Spacing | [Spacing, Spacing];
export type Margin = Spacing | [Spacing, Spacing];
export type Direction = "horizontal" | "vertical";
export type Position = "left" | "right";
export type Justify = "none" | "center" | "flex-start" | "space-between" | "flex-end" | "stretch";
export type Align = "none" | "center" | "stretch" | "flex-start" | "flex-end";
export type FlexDirection = "row" | "column";
export type Color = "none" | "negative" | "warning" | "highlight" | "primary-background" | "secondary-background" | "divider" | "inherit";
export type TextColor = "primary" | "secondary" | "highlight" | "negative" | "subtle" | "light" | "inherit";
export type Styles = CSS.Properties<string | number | CSS.Properties<string | number>>;
export type JSStyle = Styles | null | false | undefined | {
    [key: string]: Styles;
} | Array<JSStyle>;
export type FlatStyles = Styles & {
    other: {
        [key: string]: Styles;
    };
};
export declare const createJSStyle: <T extends {
    [key: string]: Styles | {
        [key: string]: Styles;
    };
}>(styles: T, { useIncrementalIdentifiers }?: {
    useIncrementalIdentifiers: boolean;
}) => T;
export declare const createClassNames: (...styles: Array<JSStyle>) => string;
export declare const generateStylesheet: ({ light, dark, }: {
    light: Theme;
    dark: Theme;
}) => string;
export type Theme = {
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
export declare const StylesProvider: ({ children, themes, }: {
    children: ReactNode;
    themes: {
        light: Theme;
        dark: Theme;
    };
}) => JSX.Element;
export declare const getBackground: (color: Color) => any;
export declare const getJustify: (prop: Justify) => any;
export declare const getAlign: (prop: Align) => any;
export declare const getGap: (gap: Gap) => any;
export declare const paddingStyles: {
    xsmall: {
        padding: string;
    };
    small: {
        padding: string;
    };
    medium: {
        padding: string;
    };
    large: {
        padding: string;
    };
    xlarge: {
        padding: string;
    };
    "xsmall-row": {
        paddingLeft: string;
        paddingRight: string;
    };
    "small-row": {
        paddingLeft: string;
        paddingRight: string;
    };
    "medium-row": {
        paddingLeft: string;
        paddingRight: string;
    };
    "large-row": {
        paddingLeft: string;
        paddingRight: string;
    };
    "xlarge-row": {
        paddingLeft: string;
        paddingRight: string;
    };
    "xsmall-column": {
        paddingTop: string;
        paddingBottom: string;
    };
    "small-column": {
        paddingTop: string;
        paddingBottom: string;
    };
    "medium-column": {
        paddingTop: string;
        paddingBottom: string;
    };
    "large-column": {
        paddingTop: string;
        paddingBottom: string;
    };
    "xlarge-column": {
        paddingTop: string;
        paddingBottom: string;
    };
};
export declare const marginStyles: {
    xsmall: {
        margin: string;
    };
    small: {
        margin: string;
    };
    medium: {
        margin: string;
    };
    xlarge: {
        margin: string;
    };
    large: {
        margin: string;
    };
    "xsmall-row": {
        marginLeft: string;
        marginRight: string;
    };
    "small-row": {
        marginLeft: string;
        marginRight: string;
    };
    "medium-row": {
        marginLeft: string;
        marginRight: string;
    };
    "large-row": {
        marginLeft: string;
        marginRight: string;
    };
    "xlarge-row": {
        marginLeft: string;
        marginRight: string;
    };
    "xsmall-column": {
        marginTop: string;
        marginBottom: string;
    };
    "small-column": {
        marginTop: string;
        marginBottom: string;
    };
    "medium-column": {
        marginTop: string;
        marginBottom: string;
    };
    "large-column": {
        marginTop: string;
        marginBottom: string;
    };
    "xlarge-column": {
        marginTop: string;
        marginBottom: string;
    };
};
export declare const getPadding: (padding: Padding) => any;
export declare const getMargin: (margin: Margin) => any;
export declare const grow: {
    flexGrow: number;
};
export declare const shrink: {
    shrink: {
        flexShrink: number;
    };
};
export declare const getFlex: (direction: FlexDirection) => {
    display: "flex";
    flexDirection: "row";
} | {
    display: "flex";
    flexDirection: "column";
};
export declare const getBorder: (direction?: "top" | "bottom" | "left" | "right") => {
    borderTop: string;
} | {
    borderBottom: string;
} | {
    borderRight: string;
} | {
    borderLeft: string;
} | {
    border: string;
};
export declare const MOBILE = 750;
export declare const TABLET = 1000;
export declare const LAPTOP = 1200;
export declare const withMedia: (styles: {
    phone?: Styles;
    tablet?: Styles;
    laptop?: Styles;
    desktop?: Styles;
}) => {
    [x: string]: Styles;
};
export declare const getTextColor: (color: TextColor) => {
    color: "var(--primary-text)";
} | {
    color: "var(--secondary-text)";
} | {
    color: "var(--highlight-text)";
} | {
    color: "var(--negative-text)";
} | {
    color: "var(--subtle-text)";
} | {
    color: "var(--light-text)";
} | {
    color: "inherit";
};
