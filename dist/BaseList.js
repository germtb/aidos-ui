import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { Column } from "./Column";
export const BaseList = React.forwardRef(({ jsStyle, ...otherProps }, ref) => {
    return (_jsx(Column, { ...otherProps, tag: "ul", jsStyle: [
            {
                listStyle: "none",
                margin: 0,
                padding: 0,
            },
            jsStyle,
        ], ref: ref }));
});
//# sourceMappingURL=BaseList.js.map