import React from "react";
import { createJSStyles, createClassNames, getTextColor, } from "./Palette";
const jsStyles = createJSStyles({
    root: {},
    ellipsis: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
    size1: {
        fontSize: 16,
        lineHeight: 20 / 16,
    },
    size2: {
        fontSize: 20,
        lineHeight: 24 / 20,
    },
    size3: {
        fontSize: 24,
        lineHeight: 28 / 24,
    },
    size4: {
        fontWeight: "bold",
        fontSize: 26,
        lineHeight: 30 / 26,
    },
    textAlignCenter: {
        textAlign: "center",
    },
});
export function Text({ children, color = "primary", size = "medium", align = "none", ellipsis = true, }) {
    return (React.createElement("span", { className: createClassNames([
            jsStyles.root,
            getTextColor(color),
            size === "small" && jsStyles.size1,
            size === "medium" && jsStyles.size2,
            size === "large" && jsStyles.size4,
            align === "center" && jsStyles.textAlignCenter,
            ellipsis && jsStyles.ellipsis,
        ]) }, children));
}
