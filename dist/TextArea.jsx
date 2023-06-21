import React from "react";
import { createClassNames, createJSStyles } from "./Palette";
const jsStyles = createJSStyles({
    root: {
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
});
export const TextArea = React.forwardRef(({ jsStyle, onValueChange, value, onChange, ...otherProps }, ref) => {
    return (<textarea {...otherProps} ref={ref} className={createClassNames(jsStyles.root, jsStyle)} value={value} onChange={onValueChange ? (e) => onValueChange(e.target.value) : undefined}/>);
});
//# sourceMappingURL=TextArea.jsx.map