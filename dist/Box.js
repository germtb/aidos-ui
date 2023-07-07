import React from "react";
import { FlexLayout } from "./FlexLayout";
export function Box({ padding = "medium", align = "center", justify = "center", ...otherProps }) {
    return (React.createElement(FlexLayout, { padding: padding, align: align, justify: justify, ...otherProps }));
}
//# sourceMappingURL=Box.js.map