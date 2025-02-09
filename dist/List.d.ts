import React from "react";
import { BaseListProps } from "./BaseList";
interface ListProps extends BaseListProps {
    ariaLabel: string;
    bare?: boolean;
    autofocus?: boolean;
    role?: undefined;
    navigation?: boolean;
    carded?: boolean;
}
export declare function List({ ariaLabel, jsStyle, autofocus, navigation, bare, carded, ...otherProps }: ListProps): React.JSX.Element;
export declare const useListContext: () => {
    bare: boolean;
    carded: boolean;
};
export {};
