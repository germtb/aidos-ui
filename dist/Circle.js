import React from "react";
import { createJSStyle } from "./Styles";
import { Box } from "./Box";
const jsStyles = createJSStyle({
    root: {
        borderRadius: "50%",
        overflow: "hidden",
    },
});
export function Circle({ jsStyle, padding = "medium", ...otherProps }) {
    return (React.createElement(Box, { padding: padding, jsStyle: [jsStyles.root, jsStyle], ...otherProps }));
}
//# sourceMappingURL=Circle.js.map