import React from "react";
import { BaseInput } from "./BaseInput";
import { Box } from "./Box";
import { Icon } from "./Icon";
import { createJSStyles } from "./Styles";
import { Row } from "./Row";
const jsStyles = createJSStyles({
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
});
export const DatetimeInput = React.forwardRef(({ date, onDateChange, jsStyle, icon, addOn, ...inputProps }, ref) => {
    return (React.createElement(Row, { jsStyle: jsStyles.root },
        icon && (React.createElement(Box, { padding: "medium" },
            React.createElement(Icon, { size: "medium", color: "secondary", icon: icon }))),
        React.createElement(BaseInput, { ...inputProps, type: "datetime-local", ref: ref, value: date.toISOString().substring(0, 16), onChange: (e) => onDateChange(new Date(e.target.value)), jsStyle: [jsStyles.input, jsStyle] }),
        addOn));
});
//# sourceMappingURL=DatetimeInput.js.map