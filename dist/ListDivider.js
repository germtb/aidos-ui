import React from "react";
import { createJSStyles } from "./Palette";
import { BaseView } from "./BaseView";
const jsStyles = createJSStyles({
    root: {
        width: "100%",
        borderBottom: "1px solid var(--divider)",
    },
});
export function ListDivider() {
    return React.createElement(BaseView, { componentName: ["ListDivider"], jsStyle: jsStyles.root });
}
//# sourceMappingURL=ListDivider.js.map