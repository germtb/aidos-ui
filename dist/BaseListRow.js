import React from "react";
import { ListDivider } from "./ListDivider";
import { Row } from "./Row";
import { getBackground } from "./JSS";
export const BaseListRow = React.forwardRef(({ children, jsStyle, withDivider = true, backgroundColor = "primary-background", ...otherProps }, ref) => {
    return (React.createElement(React.Fragment, null,
        React.createElement(Row, { ...otherProps, ref: ref, tag: "li", role: "row", jsStyle: [
                {
                    position: "relative",
                },
                getBackground(backgroundColor),
                jsStyle,
            ] }, children),
        withDivider && React.createElement(ListDivider, null)));
});
//# sourceMappingURL=BaseListRow.js.map