import React from "react";
import { createJSStyles, getTextColor } from "./Palette";
import { BaseView } from "./BaseView";
const jsStyles = createJSStyles({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        " svg": {
            height: "inherit",
            width: "inherit",
        },
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
});
let initialized = false;
export const initialize = () => {
    if (initialized) {
        return;
    }
    const hasIconify = document.getElementById("iconify");
    if (hasIconify) {
        initialized = true;
        return;
    }
    const script = document.createElement("script");
    script.src = "https://code.iconify.design/2/2.2.1/iconify.min.js";
    script.id = "iconify";
    document.head.appendChild(script);
    initialized = true;
};
export function Icon({ icon, size, color, ariaLabel, }) {
    return (React.createElement(BaseView, { "aria-label": ariaLabel, jsStyle: [
            jsStyles.root,
            size === "small" && jsStyles.small,
            size === "medium" && jsStyles.medium,
            size === "large" && jsStyles.large,
            getTextColor(color),
        ] },
        React.createElement("span", { className: "iconify", "data-icon": icon })));
}
