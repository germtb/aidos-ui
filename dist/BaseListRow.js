import React from "react";
import { ListDivider } from "./ListDivider";
import { Row } from "./Row";
import { getBackground } from "./jss";
export const BaseListRow = React.forwardRef(({ children, jsStyle, withDivider = true, backgroundColor = "primary-background", ...otherProps }, ref) => {
    return (React.createElement(React.Fragment, null,
        React.createElement(Row, { ...otherProps, ref: ref, relative: true, tag: "li", role: "row", jsStyle: [getBackground(backgroundColor), jsStyle] }, children),
        withDivider && React.createElement(ListDivider, null)));
});
//# sourceMappingURL=BaseListRow.js.map