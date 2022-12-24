/// <reference types="react" />
import { FlexLayoutProps } from "./FlexLayout";
export interface BoxProps extends FlexLayoutProps {
}
export declare function Box({ componentName, padding, align, justify, ...otherProps }: BoxProps): JSX.Element;
