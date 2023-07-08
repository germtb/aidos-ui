import React from "react";
import { BaseView } from "./BaseView";
import { getBackground } from "./jss";
const sizes = {
    xsmall: 4,
    small: 6,
    medium: 12,
    large: 18,
    xlarge: 24,
};
export function Badge({ size = "medium", color = "highlight", jsStyle, }) {
    return (React.createElement(BaseView, { jsStyle: [
            {
                width: sizes[size],
                height: sizes[size],
                borderRadius: sizes[size] / 2,
            },
            getBackground(color),
            jsStyle,
        ] }));
}
//# sourceMappingURL=Badge.js.map