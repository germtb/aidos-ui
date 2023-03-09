import React from "react";
import { createJSStyles, getBackground, } from "./Palette";
import { ListDivider } from "./ListDivider";
import { Row } from "./Row";
const jsStyles = createJSStyles({
    root: {
        position: "relative",
        overflowX: "auto",
    },
});
export const BaseListRow = React.forwardRef(({ componentName, children, jsStyle, withDivider = true, backgroundColor = "primary-background", ...otherProps }, ref) => {
    return (React.createElement(React.Fragment, null,
        React.createElement(Row, { ...otherProps, ref: ref, tag: "li", role: "row", componentName: componentName.concat("BaseListRow"), jsStyle: [jsStyles.root, getBackground(backgroundColor), jsStyle] }, children),
        withDivider && React.createElement(ListDivider, null)));
});
//# sourceMappingURL=BaseListRow.js.map