import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { BaseInput } from "./BaseInput";
import { Box } from "./Box";
import { Icon } from "./Icon";
import { Row } from "./Row";
const jsStyles = {
    root: {
        backgroundColor: "var(--primary-background)",
    },
    input: {
        padding: "var(--spacing-m)",
        flexGrow: 1,
        backgroundColor: "var(--primary-background)",
        color: "var(--primary-text)",
        outline: "none",
        border: "none",
        fontSize: 20,
        lineHeight: 24 / 20,
        "::placeholder": {
            color: "var(--subtle-text);",
        },
        ":disabled": {
            color: "var(--subtle-text);",
        },
    },
};
export const DatetimeInput = React.forwardRef(({ date, onDateChange, jsStyle, icon, addOn, ...inputProps }, ref) => {
    return (_jsxs(Row, { jsStyle: jsStyles.root, children: [icon && (_jsx(Box, { padding: "medium", children: _jsx(Icon, { size: "medium", color: "secondary", icon: icon }) })), _jsx(BaseInput, { ...inputProps, type: "datetime-local", ref: ref, value: date.toISOString().substring(0, 16), onChange: (e) => onDateChange(new Date(e.target.value)), jsStyle: [jsStyles.input, jsStyle] }), addOn] }));
});
//# sourceMappingURL=DatetimeInput.js.map