import React from "react";
import { getBackground, createJSStyles } from "./Palette";
import { BaseView } from "./BaseView";
const jsStyles = createJSStyles({
    small: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    medium: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    large: {
        width: 18,
        height: 18,
        borderRadius: 9,
    },
});
export function Badge({ size = "medium", color = "highlight", }) {
    return (<BaseView jsStyle={[
            size === "small" && jsStyles.small,
            size === "medium" && jsStyles.medium,
            size === "large" && jsStyles.large,
            getBackground(color),
        ]}/>);
}
//# sourceMappingURL=Badge.jsx.map