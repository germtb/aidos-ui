import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { BaseButton } from "./BaseButton";
import { Icon } from "./Icon";
import { getGlyphColor } from "./Interactable";
const sizes = {
    xsmall: 20,
    small: 24,
    medium: 32,
    large: 40,
    xlarge: 48,
};
export const IconButton = React.forwardRef(({ icon, size, color, bare, disabled, jsStyle, ...buttonProps }, ref) => {
    return (_jsx(BaseButton, { ...buttonProps, bare: bare, jsStyle: [
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
            jsStyle,
        ], color: color, ref: ref, disabled: disabled, children: _jsx(Icon, { size: size, icon: icon, color: getGlyphColor(color, disabled, bare) }) }));
});
//# sourceMappingURL=IconButton.js.map