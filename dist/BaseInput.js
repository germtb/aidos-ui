import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useId } from "react";
import { jss } from "./jss";
import { Label } from "./Text";
export const BaseInput = React.forwardRef(({ jsStyle, label, labelPosition = "end", labelSize, labelColor, labelBold, id: propId, ...otherProps }, ref) => {
    const hookid = useId();
    const id = propId ?? hookid;
    const labelElement = (_jsx(Label, { size: labelSize, bold: labelBold, color: labelColor, jsStyle: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }, htmlFor: id, children: label }));
    return (_jsxs(_Fragment, { children: [label && labelPosition === "start" && labelElement, _jsx("input", { id: id, ref: ref, className: jss(jsStyle), ...otherProps }), label && labelPosition === "end" && labelElement] }));
});
//# sourceMappingURL=BaseInput.js.map