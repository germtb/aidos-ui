import React from "react";
import { BaseListItemProps } from "./BaseListItem";
import { InteractableColor } from "./Interactable";
interface ListButtonItemProps extends BaseListItemProps {
    color: InteractableColor;
    onClick: () => void;
    headline: string;
    body?: string;
    disabled?: boolean;
    selected?: boolean;
    children?: void;
}
export declare const ListButtonItem: React.ForwardRefExoticComponent<Omit<ListButtonItemProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;
export {};
