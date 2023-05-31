import CSS from "csstype";
import { ReactNode } from "react";
export declare type Size = "small" | "medium" | "large";
export declare type Spacing = "none" | Size;
export declare type Gap = Spacing;
export declare type Padding = Spacing | [Spacing, Spacing];
export declare type Margin = Spacing | [Spacing, Spacing];
export declare type Direction = "horizontal" | "vertical";
export declare type Position = "left" | "right";
export declare type Justify = "none" | "center" | "flex-start" | "space-between" | "flex-end" | "stretch";
export declare type Align = "none" | "center" | "stretch" | "flex-start" | "flex-end";
export declare type FlexDirection = "row" | "column";
export declare type Color = "none" | "negative" | "warning" | "highlight" | "primary-background" | "secondary-background" | "divider" | "inherit";
export declare type TextColor = "primary" | "secondary" | "highlight" | "negative" | "subtle" | "light" | "inherit";
export declare type Styles = CSS.Properties<string | number | CSS.Properties<string | number>>;
export declare type JSStyles = Styles | null | false | undefined | {
    [key: string]: Styles;
} | Array<JSStyles>;
export declare type FlatStyles = Styles & {
    other: {
        [key: string]: Styles;
    };
};
export declare function createJSStyle(styles: Styles): Styles;
export declare const createJSStyles: <T extends {
    [key: string]: Styles | {
        [key: string]: Styles;
    };
}>(styles: T) => T;
export declare const createClassNames: (...styles: Array<JSStyles>) => string;
export declare const generateStylesheet: ({ light, dark, }: {
    light: Theme;
    dark: Theme;
}) => string;
export declare type Theme = {
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
export declare const PaletteProvider: ({ children, themes, }: {
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
    small: {
        padding: string;
    };
    medium: {
        padding: string;
    };
    large: {
        padding: string;
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
};
export declare const marginStyles: {
    small: {
        margin: string;
    };
    medium: {
        margin: string;
    };
    large: {
        margin: string;
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
export declare const getDisplayMedia: (styles: {
    phone: Styles;
    tablet: Styles;
    laptop: Styles;
    desktop: Styles;
}) => {
    "@media (min-width: 0px) and (max-width: 750px)": Styles;
    "@media (min-width: 750px) and (max-width: 1000px)": Styles;
    "@media (min-width: 1000px) and (max-width: 1200px)": Styles;
    "@media (min-width: 1200px)": Styles;
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
