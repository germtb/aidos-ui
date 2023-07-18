import { JSStyle, Padding, TextColor } from "./jss";
export type InteractableColor = "positive" | "secondary" | "negative";
export declare function getInteractableJSStyles({ color, bare, disabled, animateInteraction, padding, }: {
    color: InteractableColor;
    bare: boolean;
    disabled: boolean;
    animateInteraction: boolean;
    padding: Padding;
}): Array<JSStyle>;
export declare const getGlyphColor: (color: InteractableColor, disabled: boolean | undefined, bare: boolean | undefined) => TextColor;
export declare const getInteractableListItemJSStyles: ({ bare, }: {
    bare: boolean;
}) => {
    overflow: string;
    flexGrow: number;
    borderRadius: string;
    textDecoration: string;
    "[aria-selected=true]": {
        backgroundColor: string;
        boxShadow: string;
    };
    ":hover": {
        backgroundColor: string;
    };
    "[aria-selected=true]:hover": {
        backgroundColor: string;
    };
    ":active:hover": {
        backgroundColor: string;
    };
    "[aria-selected=true]:active:hover": {
        backgroundColor: string;
    };
    "[aria-disabled=true]": {
        backgroundColor: string;
    };
    "[aria-disabled=true]:active:hover": {
        backgroundColor: string;
    };
};
