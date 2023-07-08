import React from "react";
import { BaseInput } from "./BaseInput";
import { Box } from "./Box";
import { Icon } from "./Icon";
import { Row } from "./Row";
export const DateInput = React.forwardRef(({ date, onDateChange, jsStyle, icon, addOn, ...inputProps }, ref) => {
    return (React.createElement(Row, { jsStyle: {
            backgroundColor: "inherit",
        } },
        icon && (React.createElement(Box, { padding: "medium" },
            React.createElement(Icon, { size: "medium", color: "secondary", icon: icon }))),
        React.createElement(BaseInput, { ...inputProps, type: "date", ref: ref, value: date.toISOString().substring(0, 10), onChange: (e) => onDateChange(new Date(e.target.value)), jsStyle: [
                {
                    flexGrow: 1,
                    backgroundColor: "inherit",
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
                jsStyle,
            ] }),
        addOn));
});
//# sourceMappingURL=DateInput.js.map