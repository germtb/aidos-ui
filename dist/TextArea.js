import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { cssVar, getPadding, jss } from "./jss";
export const TextArea = React.forwardRef(({ jsStyle, onValueChange, value, onChange, padding = "medium", ...otherProps }, ref) => {
    return (_jsx("textarea", { ...otherProps, ref: ref, className: jss([
            {
                flexGrow: 1,
                color: cssVar("--primary-text"),
                outline: "none",
                fontSize: 20,
                lineHeight: 24 / 20,
                backgroundColor: cssVar("--overlay-background"),
                border: `1px solid ${cssVar("--divider")}`,
                borderRadius: cssVar("--border-radius-m"),
                "::placeholder": {
                    color: cssVar("--subtle-text"),
                },
                ":focus-visible": {
                    outline: `2px solid ${cssVar("--highlight")}`,
                    outlineOffset: -2,
                },
            },
            getPadding(padding),
            jsStyle,
        ]), value: value, onChange: onValueChange ? (e) => onValueChange(e.target.value) : undefined }));
});
//# sourceMappingURL=TextArea.js.map