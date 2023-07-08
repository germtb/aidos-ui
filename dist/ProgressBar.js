import React from "react";
import { BaseView } from "./BaseView";
import { getBackground } from "./jss";
const jsStyles = {
    root: {
        width: "100%",
        display: "flex",
        position: "relative",
        backgroundColor: "var(--primary-background)",
        borderRadius: "var(--border-radius-s)",
        border: "1px solid var(--divider)",
        overflow: "hidden",
    },
    xsmall: {
        height: 4,
    },
    small: {
        height: 8,
    },
    medium: {
        height: 12,
    },
    large: {
        height: 16,
    },
    xlarge: {
        height: 20,
    },
    fill: {
        borderRadius: "var(--border-radius-s)",
        position: "absolute",
        transformOrigin: "center left",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
};
export function ProgressBar({ color, progress, size, jsStyle, }) {
    return (React.createElement(BaseView, { jsStyle: [
            jsStyles.root,
            size === "xsmall" && jsStyles.xsmall,
            size === "small" && jsStyles.small,
            size === "medium" && jsStyles.medium,
            size === "large" && jsStyles.large,
            size === "xlarge" && jsStyles.xlarge,
            jsStyle,
        ] },
        React.createElement(BaseView, { jsStyle: [jsStyles.fill, getBackground(color)], style: {
                transform: `scaleX(${progress > 1 ? 1 : progress})`,
            } })));
}
//# sourceMappingURL=ProgressBar.js.map