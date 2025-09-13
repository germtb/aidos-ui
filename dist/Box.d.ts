import React from "react";
import { FlexLayoutProps } from "./FlexLayout";
export interface BoxProps extends FlexLayoutProps {
}
export declare function Box({ padding, align, justify, ...otherProps }: BoxProps): React.JSX.Element;
