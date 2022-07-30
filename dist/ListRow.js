import React from "react";
import { BaseListRow } from "./BaseListRow";
export const ListRow = React.forwardRef(({ componentName, ...otherProps }, ref) => {
    return (React.createElement(BaseListRow, { ...otherProps, componentName: (componentName ?? []).concat("ListRow"), ref: ref, align: "center" }));
});
