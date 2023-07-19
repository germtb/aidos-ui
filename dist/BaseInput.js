import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useId } from "react";
import { jss } from "./jss";
export const BaseInput = React.forwardRef(({ jsStyle, labelContent, ...otherProps }, ref) => {
    const id = useId();
    return (_jsxs(_Fragment, { children: [labelContent && _jsx("label", { htmlFor: id, children: labelContent }), _jsx("input", { id: id, ref: ref, className: jss(jsStyle), ...otherProps })] }));
});
//# sourceMappingURL=BaseInput.js.map