/// <reference types="react" />
import { BaseListProps } from "./BaseList";
interface ListProps extends BaseListProps {
    ariaLabel: string;
    autofocus?: boolean;
    role?: undefined;
}
export declare function List({ ariaLabel, jsStyle, autofocus, ...otherProps }: ListProps): JSX.Element;
export {};
