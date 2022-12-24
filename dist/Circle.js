import React from "react";
import { createJSStyles } from "./Palette";
import { Box } from "./Box";
const jsStyles = createJSStyles({
    root: {
        borderRadius: "50%",
        overflow: "hidden",
    },
});
export function Circle({ jsStyle, padding = "medium", componentName, ...otherProps }) {
    return (React.createElement(Box, { componentName: (componentName ?? []).concat("Circle"), padding: padding, jsStyle: [jsStyles.root, jsStyle], ...otherProps }));
}
//# sourceMappingURL=Circle.js.map