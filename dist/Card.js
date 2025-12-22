import { jsx as _jsx } from "react/jsx-runtime";
import { FlexLayout } from "./FlexLayout";
import { cssVar } from "./jss";
export function Card({ children, jss, padding = "large", gap = "large", ...otherProps }) {
    return (_jsx(FlexLayout, { ...otherProps, padding: padding, gap: gap, jss: [
            {
                backgroundColor: cssVar("--overlay-background"),
                borderRadius: cssVar("--border-radius-l"),
                boxShadow: "1px 1px 4px 1px #e0e0e0",
            },
            jss,
        ], children: children }));
}
//# sourceMappingURL=Card.js.map