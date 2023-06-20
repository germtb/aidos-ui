import React from "react";
import { createJSStyles, grow, getPadding, } from "./Palette";
import { BaseButton } from "./BaseButton";
import { Text } from "./Text";
import { Row } from "./Row";
import { Icon } from "./Icon";
const jsStyles = createJSStyles({
    root: {
        borderRadius: "var(--border-radius-m)",
        justifyContent: "center",
        userSelect: "none",
    },
});
export const getGlyphColor = (color, disabled, bare) => {
    if (disabled) {
        return "subtle";
    }
    switch (color) {
        case "positive":
            return bare ? "highlight" : "light";
        case "negative":
            return bare ? "negative" : "light";
        case "secondary":
            return "primary";
    }
};
export const Button = React.forwardRef(({ label, color, bare, disabled, icon, iconSize = "medium", iconPosition = "left", align = "center", gap = "small", justify = "center", jsStyle, ...otherProps }, ref) => {
    return (React.createElement(BaseButton, { ...otherProps, bare: bare, ref: ref, color: color, disabled: disabled, jsStyle: [jsStyles.root, getPadding("medium"), jsStyle] },
        React.createElement(Row, { jsStyle: grow, align: align, gap: gap, justify: justify },
            icon && iconPosition === "left" && (React.createElement(Icon, { icon: icon, size: iconSize, color: getGlyphColor(color, disabled, bare) })),
            React.createElement(Text, { size: "medium", color: getGlyphColor(color, disabled, bare) }, label),
            icon && iconPosition === "right" && (React.createElement(Icon, { icon: icon, size: iconSize, color: getGlyphColor(color, disabled, bare) })))));
});
//# sourceMappingURL=Button.js.map