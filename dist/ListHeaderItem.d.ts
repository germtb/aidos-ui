import { ReactNode } from "react";
import { Position } from "./jss";
export declare function ListHeaderItem({ bare, headline, body, withDivider, addOn, addOnPosition, }: {
    bare?: boolean;
    headline: string;
    body?: string;
    withDivider?: boolean;
    addOn?: ReactNode;
    addOnPosition?: Position;
}): JSX.Element;
