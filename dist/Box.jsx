import React from "react";
import { FlexLayout } from "./FlexLayout";
export function Box({ componentName, padding = "medium", align = "center", justify = "center", ...otherProps }) {
    return (<FlexLayout componentName={(componentName ?? []).concat("Box")} padding={padding} align={align} justify={justify} {...otherProps}/>);
}
//# sourceMappingURL=Box.jsx.map