import React from "react";
import { createJSStyles } from "./Palette";
import { BaseView } from "./BaseView";
const jsStyles = createJSStyles({
    root: {
        height: "var(--spacing-xl)",
        backgroundColor: "var(--secondary-background)",
        width: "100%",
    },
});
export function ListSpacer() {
    return React.createElement(BaseView, { jsStyle: jsStyles.root });
}
//# sourceMappingURL=ListSpacer.js.map