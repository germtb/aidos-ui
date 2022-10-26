import React from "react";
import { createClassNames, createJSStyles } from "./Palette";
const jsStyles = createJSStyles({
    grow: {
        flexGrow: 1,
    },
    shrink: {
        flexShrink: 1,
    },
});
export const BaseView = React.forwardRef(({ jsStyle, children, componentName = [], tag, grow, shrink, ...otherProps }, ref) => {
    const Tag = tag ?? "div";
    return (
    // @ts-ignore
    React.createElement(Tag, { "data-test-id": [...componentName, "BaseView"].join("-"), ref: ref, className: createClassNames(jsStyle, grow && jsStyles.grow, shrink && jsStyles.shrink), ...otherProps }, children));
});
