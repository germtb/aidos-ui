import { jsx as _jsx } from "react/jsx-runtime";
import { Box } from "./Box";
export function Circle({ jss, padding = "medium", ...otherProps }) {
    return (_jsx(Box, { padding: padding, jss: [
            {
                borderRadius: "50%",
                overflow: "hidden",
            },
            jss,
        ], ...otherProps }));
}
//# sourceMappingURL=Circle.js.map