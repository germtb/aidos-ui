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
const sizes = {
    xsmall: 4,
    small: 8,
    medium: 12,
    large: 16,
    xlarge: 20,
};
export function ProgressBar({ color, progress, size, jsStyle, }) {
    return (<BaseView jsStyle={[
            jsStyles.root,
            {
                height: sizes[size],
            },
            jsStyle,
        ]}>
      <BaseView jsStyle={[jsStyles.fill, getBackground(color)]} style={{
            transform: `scaleX(${progress > 1 ? 1 : progress})`,
        }}/>
    </BaseView>);
}
//# sourceMappingURL=ProgressBar.jsx.map