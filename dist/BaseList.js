import React from "react";
import { createClassNames, createJSStyles } from "./Palette";
const jsStyles = createJSStyles({
    root: {
        backgroundColor: "var(--primary-background)",
        display: "flex",
        flexDirection: "column",
    },
});
export const BaseList = React.forwardRef(({ jsStyle, componentName, ...otherProps }, ref) => {
    return (React.createElement("ul", { ...otherProps, "data-test-id": componentName ?? "BaseList", className: createClassNames(jsStyles.root, jsStyle), ref: ref }));
});
