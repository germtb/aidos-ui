import { BaseView } from "./BaseView";
import { cssVar } from "./jss";
export function Card({ children }) {
    return (<BaseView jsStyle={{
            background: cssVar("--primary-background"),
            borderRadius: cssVar("--border-radius-l"),
            padding: cssVar("--spacing-l"),
            border: `1px solid ${cssVar("--divider")}`,
        }}>
      {children}
    </BaseView>);
}
//# sourceMappingURL=Card.jsx.map