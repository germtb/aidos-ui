import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { toClassnames } from "./jss";
const jsss = {
    relative: {
        position: "relative",
    },
    grow: {
        flexGrow: 1,
    },
    shrink: {
        flexShrink: 1,
    },
};
export const BaseView = React.forwardRef(({ jss, children, tag, grow, shrink, relative, ...otherProps }, ref) => {
    const Tag = tag ?? "div";
    return (
    // @ts-ignore
    _jsx(Tag, { ref: ref, className: toClassnames([
            jss,
            grow && jsss.grow,
            shrink && jsss.shrink,
            relative && jsss.relative,
        ]), ...otherProps, children: children }));
});
//# sourceMappingURL=BaseView.js.map