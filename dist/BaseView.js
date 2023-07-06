import React from "react";
import { createClassNames, createJSStyles } from "./Styles";
const jsStyles = createJSStyles({
    relative: {
        position: "relative",
    },
    grow: {
        flexGrow: 1,
    },
    shrink: {
        flexShrink: 1,
    },
});
export const BaseView = React.forwardRef(({ jsStyle, children, tag, grow, shrink, relative, ...otherProps }, ref) => {
    const Tag = tag ?? "div";
    return (
    // @ts-ignore
    React.createElement(Tag, { ref: ref, className: createClassNames(jsStyle, grow && jsStyles.grow, shrink && jsStyles.shrink, relative && jsStyles.relative), ...otherProps }, children));
});
//# sourceMappingURL=BaseView.js.map