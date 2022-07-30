import React from "react";
import { createClassNames } from "./Palette";
export const BaseView = React.forwardRef(({ jsStyle, children, componentName = [], tag, ...otherProps }, ref) => {
    const Tag = tag ?? "div";
    return (
    // @ts-ignore
    React.createElement(Tag, { "data-test-id": [...componentName, "BaseView"].join("-"), ref: ref, className: createClassNames(jsStyle), ...otherProps }, children));
});
