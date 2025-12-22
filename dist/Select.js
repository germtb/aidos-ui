import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from "react";
import { cssVar, toClassnames } from "./jss";
export const Select = forwardRef(({ jss, children, onValueChange, value, ...otherProps }, ref) => {
    return (_jsx("select", { ref: ref, className: toClassnames([
            {
                fontSize: 20,
                border: `1px solid ${cssVar("--divider")}`,
                backgroundColor: cssVar("--overlay-background"),
                borderRadius: cssVar("--border-radius-m"),
            },
            jss,
        ]), value: value, onChange: (e) => {
            onValueChange(e.target.value);
        }, ...otherProps, children: children }));
});
//# sourceMappingURL=Select.js.map