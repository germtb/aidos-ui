import React from "react";
import { BaseListItemProps } from "./BaseListItem";
import { InteractableColor } from "./Interactable";
interface ListLinkItemProps extends BaseListItemProps {
    color?: InteractableColor;
    children?: void;
    onClick?: () => void;
    href: string;
    headline: string;
    body?: string;
    disabled?: boolean;
    selected?: boolean;
    target?: string;
}
export declare const ListLinkItem: React.ForwardRefExoticComponent<Omit<ListLinkItemProps, "ref"> & React.RefAttributes<HTMLAnchorElement>>;
export {};
