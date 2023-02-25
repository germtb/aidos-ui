import React from "react";
import { createJSStyles } from "./Palette";
import { BaseInput } from "./BaseInput";
import { Icon } from "./Icon";
import { Row } from "./Row";
import { Box } from "./Box";
const jsStyles = createJSStyles({
    root: {
        backgroundColor: "inherit",
    },
    input: {
        // padding: "var(--spacing-m)",
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
export const TextInput = React.forwardRef(({ value, onValueChange, rootJSStyle, jsStyle, icon, addOn, indentation, ...inputProps }, ref) => {
    return (React.createElement(Row, { jsStyle: [jsStyles.root, rootJSStyle], padding: indentation },
        icon && (React.createElement(Box, { padding: "medium" },
            React.createElement(Icon, { size: "medium", color: "secondary", icon: icon }))),
        React.createElement(BaseInput, { ...inputProps, ref: ref, value: value, onChange: onValueChange ? (e) => onValueChange(e.target.value) : undefined, jsStyle: [jsStyles.input, jsStyle] }),
        addOn));
});
//# sourceMappingURL=TextInput.js.map