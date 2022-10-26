import React from "react";
import { BaseView } from "./BaseView";
import { createJSStyles } from "./Palette";
const jsStyles = createJSStyles({
    root: {
        backgroundColor: "var(--primary-background)",
        display: "flex",
        flexDirection: "column",
    },
});
export const BaseList = React.forwardRef(({ jsStyle, componentName, ...otherProps }, ref) => {
    return (React.createElement(BaseView, { ...otherProps, tag: "ul", jsStyle: [jsStyles.root, jsStyle], "data-test-id": componentName ?? "BaseList", ref: ref }));
});
