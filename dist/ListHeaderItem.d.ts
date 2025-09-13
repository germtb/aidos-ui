import { ReactNode } from "react";
import { Position } from "./jss";
export declare function ListHeaderItem({ highlight, headline, body, withDivider, addOn, addOnPosition, }: {
    highlight?: boolean;
    headline: string;
    body?: string;
    withDivider?: boolean;
    addOn?: ReactNode;
    addOnPosition?: Position;
}): import("react/jsx-runtime").JSX.Element;
