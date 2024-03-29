import { jsx as _jsx } from "react/jsx-runtime";
import { FlexLayout } from "./FlexLayout";
import { cssVar } from "./jss";
export function Card({ children, jsStyle, padding = "large", gap = "large", ...otherProps }) {
    return (_jsx(FlexLayout, { ...otherProps, padding: padding, gap: gap, jsStyle: [
            {
                backgroundColor: cssVar("--overlay-background"),
                borderRadius: cssVar("--border-radius-l"),
                boxShadow: "1px 1px 4px 1px #e0e0e0",
            },
            jsStyle,
        ], children: children }));
}
//# sourceMappingURL=Card.js.map