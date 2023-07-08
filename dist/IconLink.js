import React from "react";
import { Icon } from "./Icon";
import { getGlyphColor } from "./Interactable";
import { BaseLink } from "./BaseLink";
const sizes = {
    xsmall: 20,
    small: 24,
    medium: 32,
    large: 40,
    xlarge: 48,
};
export const IconButton = React.forwardRef(({ icon, size, color, bare, disabled, ...buttonProps }, ref) => {
    return (React.createElement(BaseLink, { ...buttonProps, bare: bare, jsStyle: [
            {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: sizes[size],
                width: sizes[size],
                borderRadius: sizes[size] / 2,
            },
            !disabled && {
                ":active": {
                    transform: "scale(0.92)",
                },
            },
        ], color: color, ref: ref, disabled: disabled },
        React.createElement(Icon, { size: size, icon: icon, color: getGlyphColor(color, disabled, bare) })));
});
//# sourceMappingURL=IconLink.js.map