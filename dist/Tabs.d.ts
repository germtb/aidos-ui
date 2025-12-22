import { RowProps } from "./Row";
import { JSStyle, Padding, Size } from "./jss";
import { ReactNode } from "react";
export type Tab = {
    label: string;
    href?: string;
    onClick?: () => void;
    selected?: boolean;
    addOn?: ReactNode;
    addOnPosition?: "start" | "end";
};
export interface TabsProps extends RowProps {
    ["aria-controls"]: string;
    tabs: Array<Tab>;
    labelSize?: Size;
    bare?: boolean;
    tabPadding?: Padding;
    tabJSStyle?: JSStyle;
    labelRenderer?: (label: string) => ReactNode;
}
export declare function Tabs({ tabs, gap, padding, tabPadding, labelSize, jss, tabJSStyle, labelRenderer, ["aria-controls"]: ariaControls, ...otherProps }: TabsProps): import("react").JSX.Element;
