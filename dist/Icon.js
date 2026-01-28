import { jsx as _jsx } from "react/jsx-runtime";
import { Icon as IconifyIcon } from "@iconify/react";
import { BaseView } from "./BaseView";
import { getTextColor } from "./jss";
const jsss = {
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
export function IconProvider({ children }) {
    return children;
}
export function Icon({ icon, size, color, ariaLabel, }) {
    return (_jsx(BaseView, { "aria-label": ariaLabel, jss: [
            jsss.root,
            size === "xsmall" && jsss.xsmall,
            size === "small" && jsss.small,
            size === "medium" && jsss.medium,
            size === "large" && jsss.large,
            size === "xlarge" && jsss.xlarge,
            size === "xxlarge" && jsss.xxlarge,
            size === "xxxlarge" && jsss.xxxlarge,
            getTextColor(color),
        ], children: _jsx(IconifyIcon, { icon: icon, width: "100%", height: "100%" }) }));
}
//# sourceMappingURL=Icon.js.map