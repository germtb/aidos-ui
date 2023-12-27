import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { BaseLink } from "./BaseLink";
import { Text } from "./Text";
import { Row } from "./Row";
import { Icon } from "./Icon";
import { getGlyphColor, getCSSColor } from "./Interactable";
import { cssVar } from "./jss";
export const Link = React.forwardRef(({ label, color, bare, disabled, icon, underline, iconSize = "medium", iconPosition = "left", align = "center", gap = "small", justify = "center", jsStyle, size = "medium", bold, ...otherProps }, ref) => {
    return (_jsx(BaseLink, { ...otherProps, bare: bare, ref: ref, color: color, disabled: disabled, jsStyle: [
            {
                borderRadius: "var(--border-radius-m)",
                justifyContent: "center",
                userSelect: "none",
                padding: cssVar("--spacing-m"),
                display: "inline-flex",
                textDecoration: "none",
            },
            underline && {
                textDecorationLine: "underline",
                textDecorationThickness: "2px",
                textUnderlineOffset: "2px",
                textDecorationColor: getCSSColor(color, disabled, bare),
            },
            jsStyle,
        ], children: _jsxs(Row, { grow: true, align: align, gap: gap, justify: justify, children: [icon && iconPosition === "left" && (_jsx(Icon, { icon: icon, size: iconSize, color: getGlyphColor(color, disabled, bare) })), _jsx(Text, { bold: bold, size: size, color: getGlyphColor(color, disabled, bare), children: label }), icon && iconPosition === "right" && (_jsx(Icon, { icon: icon, size: iconSize, color: getGlyphColor(color, disabled, bare) }))] }) }));
});
//# sourceMappingURL=Link.js.map