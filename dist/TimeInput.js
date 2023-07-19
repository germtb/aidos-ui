import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { BaseInput } from "./BaseInput";
import { Box } from "./Box";
import { Icon } from "./Icon";
import { Row } from "./Row";
export const timeFormatter = Intl.DateTimeFormat("en-UK", {
    hour: "2-digit",
    minute: "2-digit",
});
function TimeInputInternal({ time: date, onTimeChange: onDateChange, jsStyle, icon, addOn, ...inputProps }, ref) {
    return (_jsxs(Row, { jsStyle: {
            backgroundColor: "inherit",
        }, children: [icon && (_jsx(Box, { padding: "medium", children: _jsx(Icon, { size: "medium", color: "secondary", icon: icon }) })), _jsx(BaseInput, { ...inputProps, type: "time", ref: ref, value: timeFormatter.format(date), onChange: (e) => {
                    const value = e.target.value;
                    const [hour, minute] = value.split(":");
                    onDateChange(new Date(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(hour), parseInt(minute)));
                }, jsStyle: [
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
                ] }), addOn] }));
}
export const TimeInput = React.forwardRef(TimeInputInternal);
//# sourceMappingURL=TimeInput.js.map