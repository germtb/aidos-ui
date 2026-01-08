import { RowProps } from "./Row";
import { JSS, Padding, Size } from "./jss";
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
    jssTab?: JSS | ((data: {
        selected: boolean;
    }) => JSS);
    labelRenderer?: (label: string) => ReactNode;
}
export declare function Tabs({ tabs, gap, padding, tabPadding, labelSize, jss, jssTab, labelRenderer, ["aria-controls"]: ariaControls, ...otherProps }: TabsProps): import("react/jsx-runtime").JSX.Element;
