import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { BaseInput } from "./BaseInput";
import { Row } from "./Row";
import { cssVar } from "./jss";
export const RangeInput = React.forwardRef(({ value, onValueChange, rootJSStyle, jsStyle, gap = "medium", padding = "none", min = 0, max = 100, step = 1, label, addOn, addOnPosition = "start", ...inputProps }, ref) => {
    return (_jsxs(Row, { gap: gap, padding: padding, align: "center", jsStyle: [
            {
                ":has(:focus-visible)": {
                    borderRadius: cssVar("--border-radius-m"),
                    backgroundColor: cssVar("--light-highlight"),
                },
            },
            rootJSStyle,
        ], children: [addOnPosition === "start" && addOn, _jsx(BaseInput, { ...inputProps, label: label, min: min, max: max, type: "range", ref: ref, value: value, onChange: (e) => {
                    onValueChange(parseFloat(e.target.value));
                }, jsStyle: [
                    {
                        backgroundColor: cssVar("--primary-background"),
                        flexGrow: 1,
                        color: cssVar("--primary-text"),
                        margin: 0,
                        paddingTop: cssVar("--spacing-m"),
                        paddingBottom: cssVar("--spacing-m"),
                        ":disabled": {
                            color: cssVar("--subtle-text"),
                        },
                    },
                    jsStyle,
                ] }), addOnPosition === "end" && addOn] }));
});
//# sourceMappingURL=RangeInput.js.map