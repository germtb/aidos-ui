import { jsx as _jsx } from "react/jsx-runtime";
import { BaseInput } from "./BaseInput";
import { Box } from "./Box";
import { Icon } from "./Icon";
export function SubmitIconInput({ icon, ...otherProps }) {
    return (_jsx(BaseInput, { label: _jsx(Box, { jsStyle: {
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                ":hover": {
                    backgroundColor: "var(--secondary-background)",
                    opacity: 0.8,
                },
                ":active": {
                    transform: "scale(0.92)",
                },
                height: 32,
                width: 32,
                borderRadius: 16,
            }, children: _jsx(Icon, { icon: icon, size: "medium", color: "primary" }) }), ...otherProps, type: "submit", jsStyle: {
            visibility: "hidden",
        }, value: "" }));
}
//# sourceMappingURL=SubmitIconInput.js.map