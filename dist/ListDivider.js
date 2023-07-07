import React from "react";
import { BaseView } from "./BaseView";
const jsStyles = {
    root: {
        width: "100%",
        borderBottom: "1px solid var(--divider)",
    },
};
export function ListDivider() {
    return React.createElement(BaseView, { jsStyle: jsStyles.root });
}
//# sourceMappingURL=ListDivider.js.map