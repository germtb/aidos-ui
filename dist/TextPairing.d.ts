import { ReactNode } from "react";
import { Align, Position, Gap, TextColor, Size } from "./Palette";
export interface TextPairingProps {
    headline: ReactNode;
    body?: ReactNode;
    headlineColor?: TextColor;
    headlineSize?: Size;
    headlineAddOn?: ReactNode;
    bodyColor?: TextColor;
    bodySize?: Size;
    addOn?: ReactNode;
    addOnPosition?: Position;
    spacing?: Gap;
    align?: Align;
}
export declare function TextPairing({ headline, body, headlineColor, headlineSize, headlineAddOn, bodyColor, bodySize, addOn, addOnPosition, spacing, align, }: TextPairingProps): JSX.Element;
