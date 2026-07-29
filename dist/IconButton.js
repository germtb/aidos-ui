import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { BaseButton } from "./BaseButton";
import { Icon } from "./Icon";
import { getGlyphColor } from "./Interactable";
import { Span } from "./Text";
const sizes = {
    xsmall: 20,
    small: 24,
    medium: 32,
    large: 40,
    xlarge: 48,
    xxlarge: 56,
    xxxlarge: 64,
};
export const IconButton = React.forwardRef(({ icon, size, color, bare, disabled, jss, label, labelSize = "medium", ...buttonProps }, ref) => {
    return (_jsxs(BaseButton, { ...buttonProps, "aria-label": buttonProps["aria-label"] ?? label, bare: bare, jss: [
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
            jss,
        ], color: color, ref: ref, disabled: disabled, children: [_jsx(Icon, { size: size, icon: icon, color: getGlyphColor(color, disabled, bare) }), label && (_jsx(Span, { size: labelSize, color: getGlyphColor(color, disabled, bare), children: label }))] }));
});
//# sourceMappingURL=IconButton.js.map