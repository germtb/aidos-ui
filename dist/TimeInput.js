import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { BaseInput } from "./BaseInput";
import { Row } from "./Row";
import { cssVar } from "./jss";
export const timeFormatter = Intl.DateTimeFormat("en-UK", {
    hour: "2-digit",
    minute: "2-digit",
});
function TimeInputInternal({ time: date, onTimeChange: onDateChange, jsStyle, addOn, padding = "small", gap = "none", addOnPosition = "start", bare, ...inputProps }, ref) {
    return (_jsxs(Row, { padding: padding, gap: gap, align: "center", jsStyle: [
            {
                borderRadius: cssVar("--border-radius-m"),
                overflow: "hidden",
            },
            bare
                ? {
                    backgroundColor: "inherit",
                    ":has(:focus-visible)": {
                        backgroundColor: cssVar("--light-highlight"),
                    },
                }
                : {
                    border: `1px solid ${cssVar("--divider")}`,
                    backgroundColor: cssVar("--overlay-background"),
                    ":has(:focus-visible)": {
                        outline: `2px solid ${cssVar("--highlight")}`,
                        outlineOffset: -2,
                    },
                },
        ], children: [addOnPosition === "start" && addOn, _jsx(BaseInput, { ...inputProps, type: "time", ref: ref, value: timeFormatter.format(date), onChange: (e) => {
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
                        "::-webkit-calendar-picker-indicator": {
                            backgroundColor: "none",
                        },
                    },
                    jsStyle,
                ] }), addOnPosition === "end" && addOn] }));
}
export const TimeInput = React.forwardRef(TimeInputInternal);
//# sourceMappingURL=TimeInput.js.map