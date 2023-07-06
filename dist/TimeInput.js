import React from "react";
import { BaseInput } from "./BaseInput";
import { Box } from "./Box";
import { Icon } from "./Icon";
import { createJSStyle } from "./Styles";
import { Row } from "./Row";
const jsStyles = createJSStyle({
    root: {
        backgroundColor: "inherit",
    },
    input: {
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
});
export const timeFormatter = Intl.DateTimeFormat("en-UK", {
    hour: "2-digit",
    minute: "2-digit",
});
function TimeInputInternal({ time: date, onTimeChange: onDateChange, jsStyle, icon, addOn, ...inputProps }, ref) {
    return (React.createElement(Row, { jsStyle: jsStyles.root },
        icon && (React.createElement(Box, { padding: "medium" },
            React.createElement(Icon, { size: "medium", color: "secondary", icon: icon }))),
        React.createElement(BaseInput, { ...inputProps, type: "time", ref: ref, value: timeFormatter.format(date), onChange: (e) => {
                const value = e.target.value;
                const [hour, minute] = value.split(":");
                onDateChange(new Date(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(hour), parseInt(minute)));
            }, jsStyle: [jsStyles.input, jsStyle] }),
        addOn));
}
export const TimeInput = React.forwardRef(TimeInputInternal);
//# sourceMappingURL=TimeInput.js.map