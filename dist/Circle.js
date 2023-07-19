import { jsx as _jsx } from "react/jsx-runtime";
import { Box } from "./Box";
export function Circle({ jsStyle, padding = "medium", ...otherProps }) {
    return (_jsx(Box, { padding: padding, jsStyle: [
            {
                borderRadius: "50%",
                overflow: "hidden",
            },
            jsStyle,
        ], ...otherProps }));
}
//# sourceMappingURL=Circle.js.map