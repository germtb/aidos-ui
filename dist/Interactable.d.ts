import { Padding } from "./Palette";
export type InterctableColor = "positive" | "secondary" | "negative";
export declare function getInteractableJSStyles({ color, bare, disabled, animateInteraction, padding, }: {
    color: InterctableColor;
    bare: boolean;
    disabled: boolean;
    animateInteraction: boolean;
    padding: Padding;
}): any[];
