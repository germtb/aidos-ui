/// <reference types="react" />
import { BaseListProps } from "./BaseList";
interface ListProps extends BaseListProps {
    ariaLabel: string;
    bare?: boolean;
    autofocus?: boolean;
    role?: undefined;
    navigation?: boolean;
}
export declare function List({ ariaLabel, jsStyle, autofocus, navigation, bare, ...otherProps }: ListProps): JSX.Element;
export {};
