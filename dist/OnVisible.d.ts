import React, { ReactElement } from "react";
export declare function OnVisible({ children, onVisible, }: {
    children: (refCallback: React.RefCallback<HTMLElement>) => ReactElement;
    onVisible: () => void;
}): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
