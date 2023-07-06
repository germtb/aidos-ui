import React from "react";
import { BaseListRow } from "./BaseListRow";
import { createJSStyles, grow } from "./Styles";
const jsStyles = createJSStyles({
    root: {
        position: "relative",
        padding: "var(--spacing-m)",
    },
});
export const CenteredListRow = React.forwardRef((props, ref) => {
    return (React.createElement(BaseListRow, { ...props, align: "center", justify: "center", jsStyle: [props.jsStyle, jsStyles.root, grow], ref: ref, withDivider: false }));
});
//# sourceMappingURL=CenteredListRow.js.map