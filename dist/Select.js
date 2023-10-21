import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from "react";
import { cssVar, jss } from "./jss";
export const Select = forwardRef(({ jsStyle, children, onValueChange, value, ...otherProps }, ref) => {
    return (_jsx("select", { ref: ref, className: jss([
            {
                fontSize: 20,
                border: `1px solid ${cssVar("--divider")}`,
                backgroundColor: cssVar("--overlay-background"),
                borderRadius: cssVar("--border-radius-m"),
            },
            jsStyle,
        ]), value: value, onChange: (e) => {
            onValueChange(e.target.value);
        }, ...otherProps, children: children }));
});
//# sourceMappingURL=Select.js.map