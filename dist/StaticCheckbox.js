import React from "react";
import { createJSStyles, createClassNames } from "./Palette";
import { BaseView } from "./BaseView";
import { Icon } from "./Icon";
const jsStyles = createJSStyles({
    root: {
        position: "relative",
        backgroundColor: "var(--primary-background)",
        overflow: "hidden",
        padding: "var(--spacing-xs)",
    },
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
    small: {
        borderRadius: 12,
        height: 24,
        width: 24,
    },
    medium: {
        borderRadius: 16,
        height: 32,
        width: 32,
    },
    large: {
        borderRadius: 20,
        height: 40,
        width: 40,
    },
});
export function StaticCheckbox({ checked, size }) {
    return (React.createElement("label", { className: createClassNames(jsStyles.root, size === "small" && jsStyles.small, size === "medium" && jsStyles.medium, size === "large" && jsStyles.large) },
        React.createElement(BaseView, { jsStyle: [jsStyles.border, checked && jsStyles.borderChecked] }),
        checked && (React.createElement(BaseView, { jsStyle: jsStyles.icon },
            React.createElement(Icon, { size: size, color: "light", icon: "fa-check" })))));
}
//# sourceMappingURL=StaticCheckbox.js.map