import { JSStyle, Padding, TextColor } from "./jss";
export type InteractableColor = "positive" | "primary" | "negative" | "dark" | "light";
export declare function getInteractableJSStyles({ color, bare, disabled, animateInteraction, padding, border, }: {
    color: InteractableColor;
    bare: boolean;
    disabled: boolean;
    animateInteraction: boolean;
    padding: Padding;
    border: boolean;
}): Array<JSStyle>;
export declare const getGlyphColor: (color: InteractableColor, disabled: boolean | undefined, bare: boolean | undefined) => TextColor;
export declare const getCSSColor: (color: InteractableColor, disabled: boolean | undefined, bare: boolean | undefined) => string;
export declare const getInteractableListItemJSStyles: ({ bare, selected, }: {
    bare: boolean;
    selected: boolean;
}) => ({
    overflow: string;
    flexGrow: number;
    borderRadius: string;
    textDecoration: string;
    ":hover": {
        backgroundColor: string;
    };
    ":active:hover": {
        backgroundColor: string;
    };
    "[aria-disabled=true]": {
        backgroundColor: string;
    };
    "[aria-disabled=true]:active:hover": {
        backgroundColor: string;
    };
    backgroundColor?: undefined;
    boxShadow?: undefined;
} | {
    backgroundColor: string;
    boxShadow: string;
    ":hover": {
        backgroundColor: string;
    };
    ":active:hover": {
        backgroundColor: string;
    };
    overflow?: undefined;
    flexGrow?: undefined;
    borderRadius?: undefined;
    textDecoration?: undefined;
    "[aria-disabled=true]"?: undefined;
    "[aria-disabled=true]:active:hover"?: undefined;
})[];
