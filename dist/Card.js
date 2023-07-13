import { BaseView } from "./BaseView";
import { cssVar } from "./jss";
export function Card({ children }) {
    return (React.createElement(BaseView, { jsStyle: {
            background: cssVar("--primary-background"),
            borderRadius: cssVar("--border-radius-l"),
            padding: cssVar("--spacing-l"),
            border: `1px solid ${cssVar("--divider")}`,
        } }, children));
}
//# sourceMappingURL=Card.js.map