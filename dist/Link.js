import React from "react";
import { BaseLink } from "./BaseLink";
import { Text } from "./Text";
import { Row } from "./Row";
import { Icon } from "./Icon";
import { getGlyphColor } from "./Interactable";
import { cssVar } from "./jss";
export const Link = React.forwardRef(({ label, color, bare, disabled, icon, iconSize = "medium", iconPosition = "left", align = "center", gap = "small", justify = "center", jsStyle, size = "medium", ...otherProps }, ref) => {
    return (React.createElement(BaseLink, { ...otherProps, bare: bare, ref: ref, color: color, disabled: disabled, jsStyle: [
            {
                borderRadius: "var(--border-radius-m)",
                justifyContent: "center",
                userSelect: "none",
                padding: cssVar("--spacing-m"),
                display: "inline-flex",
                textDecoration: "none",
            },
            jsStyle,
        ] },
        React.createElement(Row, { grow: true, align: align, gap: gap, justify: justify },
            icon && iconPosition === "left" && (React.createElement(Icon, { icon: icon, size: iconSize, color: getGlyphColor(color, disabled, bare) })),
            React.createElement(Text, { size: size, color: getGlyphColor(color, disabled, bare) }, label),
            icon && iconPosition === "right" && (React.createElement(Icon, { icon: icon, size: iconSize, color: getGlyphColor(color, disabled, bare) })))));
});
//# sourceMappingURL=Link.js.map