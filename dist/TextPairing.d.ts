import { ReactNode } from "react";
import { Align, Position, Gap, TextColor, Size, Padding } from "./Palette";
import { TextType } from "./Text";
export interface TextPairingProps {
    headline: ReactNode;
    body?: ReactNode;
    headlineColor?: TextColor;
    headlineSize?: Size;
    headlineAddOn?: ReactNode;
    bodyColor?: TextColor;
    bodySize?: Size;
    bodyType?: TextType;
    addOn?: ReactNode;
    addOnPosition?: Position;
    gap?: Gap;
    padding?: Padding;
    align?: Align;
    grow?: boolean;
    shrink?: boolean;
}
export declare function TextPairing({ headline, body, headlineColor, headlineSize, headlineAddOn, bodyColor, bodySize, bodyType, addOn, addOnPosition, gap, align, grow, shrink, padding, }: TextPairingProps): JSX.Element;
