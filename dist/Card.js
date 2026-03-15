import { jsx as _jsx } from "react/jsx-runtime";
import { FlexLayout } from "./FlexLayout";
import { cssVar } from "./jss";
export function Card({ children, jss, padding = "large", gap = "large", ...otherProps }) {
    return (_jsx(FlexLayout, { ...otherProps, padding: padding, gap: gap, jss: [
            {
                backgroundColor: cssVar("--overlay-background"),
                borderRadius: cssVar("--border-radius-l"),
                boxShadow: cssVar("--shadow-sm"),
            },
            jss,
        ], children: children }));
}
//# sourceMappingURL=Card.js.map