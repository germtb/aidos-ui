import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { BaseView } from "./BaseView";
import { getTextColor } from "./jss";
const jsStyles = {
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        " svg": {
            height: "inherit",
            width: "inherit",
        },
    },
    xsmall: {
        height: 8,
        width: 8,
    },
    small: {
        height: 12,
        width: 12,
    },
    medium: {
        height: 18,
        width: 18,
    },
    large: {
        height: 24,
        width: 24,
    },
    xlarge: {
        height: 32,
        width: 32,
    },
    xxlarge: {
        height: 48,
        width: 48,
    },
    xxxlarge: {
        height: 64,
        width: 64,
    },
};
let initialized = false;
const initializeIcons = () => {
    if (initialized) {
        return;
    }
    const hasIconify = document.getElementById("iconify");
    if (hasIconify) {
        initialized = true;
        return;
    }
    const script = document.createElement("script");
    script.src = "https://code.iconify.design/3/3.1.1/iconify.min.js";
    script.id = "iconify";
    document.head.appendChild(script);
    initialized = true;
};
export function IconProvider({ children }) {
    useEffect(() => {
        initializeIcons();
    }, []);
    return children;
}
export function Icon({ icon, size, color, ariaLabel, }) {
    return (_jsx(BaseView, { "aria-label": ariaLabel, jsStyle: [
            jsStyles.root,
            size === "xsmall" && jsStyles.xsmall,
            size === "small" && jsStyles.small,
            size === "medium" && jsStyles.medium,
            size === "large" && jsStyles.large,
            size === "xlarge" && jsStyles.xlarge,
            size === "xxlarge" && jsStyles.xxlarge,
            size === "xxxlarge" && jsStyles.xxxlarge,
            getTextColor(color),
        ], children: _jsx("span", { className: "iconify", "data-icon": icon }) }, icon));
}
//# sourceMappingURL=Icon.js.map