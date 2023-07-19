import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BaseView } from "./BaseView";
import { Icon } from "./Icon";
import { cssVar } from "./jss";
const jsStyles = {
    border: {
        position: "absolute",
        top: "var(--spacing-xs)",
        bottom: "var(--spacing-xs)",
        left: "var(--spacing-xs)",
        right: "var(--spacing-xs)",
        border: "1px solid var(--divider)",
        borderRadius: "50%",
    },
    borderChecked: {
        border: "none",
        backgroundColor: "var(--highlight)",
    },
    icon: {
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        top: "var(--spacing-xs)",
        bottom: "var(--spacing-xs)",
        left: "var(--spacing-xs)",
        right: "var(--spacing-xs)",
    },
};
export const sizes = {
    xsmall: 20,
    small: 24,
    medium: 32,
    large: 40,
    xlarge: 48,
};
export function StaticCheckbox({ checked, size, icon = "fa-check", }) {
    return (_jsxs(BaseView, { jsStyle: {
            position: "relative",
            backgroundColor: cssVar("--primary-background"),
            overflow: "hidden",
            padding: cssVar("--spacing-xs"),
            borderRadius: sizes[size] / 2,
            height: sizes[size],
            width: sizes[size],
        }, children: [_jsx(BaseView, { jsStyle: [jsStyles.border, checked && jsStyles.borderChecked] }), checked && (_jsx(BaseView, { jsStyle: jsStyles.icon, children: _jsx(Icon, { size: size, color: "light", icon: icon }) }))] }));
}
//# sourceMappingURL=StaticCheckbox.js.map