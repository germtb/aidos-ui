import React, { ReactNode } from "react";
import { TextColor, Size, Position, Gap, Padding, Align, JSStyle } from "./jss";
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
    gap?: Gap;
    padding?: Padding;
    align?: Align;
    grow?: boolean;
    shrink?: boolean;
    headlineBold?: boolean;
    jsStyle?: JSStyle;
}
export declare function TextPairing({ headline, body, headlineColor, headlineSize, headlineAddOn, bodyColor, bodySize, addOn, addOnPosition, gap, align, grow, shrink, headlineBold, padding, jsStyle, }: TextPairingProps): React.JSX.Element;
