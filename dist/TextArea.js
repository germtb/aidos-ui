import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { jss } from "./jss";
export const TextArea = React.forwardRef(({ jsStyle, onValueChange, value, onChange, ...otherProps }, ref) => {
    return (_jsx("textarea", { ...otherProps, ref: ref, className: jss([
            {
                padding: "var(--spacing-m)",
                flexGrow: 1,
                backgroundColor: "var(--primary-background)",
                color: "var(--primary-text)",
                outline: "none",
                border: "none",
                fontSize: 20,
                lineHeight: 24 / 20,
                "::placeholder": {
                    color: "var(--secondary-text);",
                },
            },
            jsStyle,
        ]), value: value, onChange: onValueChange ? (e) => onValueChange(e.target.value) : undefined }));
});
//# sourceMappingURL=TextArea.js.map