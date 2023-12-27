import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { BaseButton } from "./BaseButton";
import { Text } from "./Text";
import { Row } from "./Row";
import { Icon } from "./Icon";
import { getGlyphColor } from "./Interactable";
import { cssVar } from "./jss";
export const Button = React.forwardRef(({ label, color, bare, disabled, icon, iconSize = "medium", iconPosition = "left", align = "center", gap = "small", justify = "center", jsStyle, size = "medium", bold, padding = "medium", ...otherProps }, ref) => {
    return (_jsx(BaseButton, { ...otherProps, bare: bare, ref: ref, color: color, disabled: disabled, padding: padding, jsStyle: [
            {
                borderRadius: cssVar("--border-radius-m"),
                justifyContent: "center",
                userSelect: "none",
            },
            jsStyle,
        ], children: _jsxs(Row, { grow: true, align: align, gap: gap, justify: justify, children: [icon && iconPosition === "left" && (_jsx(Icon, { icon: icon, size: iconSize, color: getGlyphColor(color, disabled, bare) })), _jsx(Text, { bold: bold, size: size, color: getGlyphColor(color, disabled, bare), children: label }), icon && iconPosition === "right" && (_jsx(Icon, { icon: icon, size: iconSize, color: getGlyphColor(color, disabled, bare) }))] }) }));
});
//# sourceMappingURL=Button.js.map