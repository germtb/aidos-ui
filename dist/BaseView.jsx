import React from "react";
import { jss } from "./jss";
const jsStyles = {
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
export const BaseView = React.forwardRef(({ jsStyle, children, tag, grow, shrink, relative, ...otherProps }, ref) => {
    const Tag = tag ?? "div";
    return (
    // @ts-ignore
    <Tag ref={ref} className={jss([
            jsStyle,
            grow && jsStyles.grow,
            shrink && jsStyles.shrink,
            relative && jsStyles.relative,
        ])} {...otherProps}>
        {children}
      </Tag>);
});
//# sourceMappingURL=BaseView.jsx.map