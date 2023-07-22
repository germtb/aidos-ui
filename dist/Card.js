import { jsx as _jsx } from "react/jsx-runtime";
import { BaseView } from "./BaseView";
import { cssVar } from "./jss";
export function Card({ children }) {
    return (_jsx(BaseView, { jsStyle: {
            backgroundColor: cssVar("--primary-background"),
            borderRadius: cssVar("--border-radius-l"),
            padding: cssVar("--spacing-l"),
            border: `1px solid ${cssVar("--divider")}`,
        }, children: children }));
}
//# sourceMappingURL=Card.js.map