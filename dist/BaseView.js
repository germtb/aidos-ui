import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { toClassnames } from "./jss";
const styles = {
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
            grow && styles.grow,
            shrink && styles.shrink,
            relative && styles.relative,
        ]), ...otherProps, children: children }));
});
//# sourceMappingURL=BaseView.js.map