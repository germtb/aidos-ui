import React from "react";
import { createJSStyles, getBackground, } from "./Palette";
import { BaseView } from "./BaseView";
const jsStyles = createJSStyles({
    root: {
        width: "100%",
        display: "flex",
        position: "relative",
        backgroundColor: "var(--primary-background)",
        borderRadius: "var(--border-radius-s)",
        border: "1px solid var(--divider)",
        overflow: "hidden",
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
    fill: {
        borderRadius: "var(--border-radius-s)",
        position: "absolute",
        transformOrigin: "center left",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
});
export function ProgressBar({ color, progress, size, jsStyle, }) {
    return (<BaseView jsStyle={[
            jsStyles.root,
            size === "small" && jsStyles.small,
            size === "medium" && jsStyles.medium,
            size === "large" && jsStyles.large,
            jsStyle,
        ]}>
      <BaseView jsStyle={[jsStyles.fill, getBackground(color)]} style={{
            transform: `scaleX(${progress > 1 ? 1 : progress})`,
        }}/>
    </BaseView>);
}
//# sourceMappingURL=ProgressBar.jsx.map