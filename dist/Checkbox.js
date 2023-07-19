import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BaseInput } from "./BaseInput";
import { jss } from "./jss";
import { StaticCheckbox, sizes } from "./StaticCheckbox";
export function Checkbox({ checked, onClick, size, ...inputProps }) {
    return (_jsxs("label", { className: jss({
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: sizes[size],
            width: sizes[size],
            ":has(:focus-visible)": {
                outline: "2px solid var(--outline)",
                borderRadius: "50%",
            },
            ":has(:active)": {
                transform: "scale(0.92)",
            },
        }), children: [_jsx(StaticCheckbox, { checked: checked, size: size }), _jsx(BaseInput, { ...inputProps, type: "checkbox", role: "checkbox", "aria-checked": `${checked}`, tabIndex: 0, checked: checked, onChange: onClick, jsStyle: {
                    position: "absolute",
                    opacity: 0,
                    cursor: "pointer",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    width: "100%",
                    height: "100%",
                } })] }));
}
//# sourceMappingURL=Checkbox.js.map