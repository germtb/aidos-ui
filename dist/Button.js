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
export const Button = React.forwardRef(({ label, color, bare, disabled, icon, iconSize = "medium", componentName, iconPosition = "left", align = "center", spacing = "small", justify = "center", jsStyle, ...otherProps }, ref) => {
    const labelElement = (React.createElement(Text, { size: "medium", color: getGlyphColor(color, disabled, bare) }, label));
    return (React.createElement(BaseButton, { ...otherProps, componentName: (componentName ?? []).concat("Button"), bare: bare, ref: ref, color: color, disabled: disabled, jsStyle: [jsStyles.root, getPadding("medium"), jsStyle] },
        React.createElement(Row, { jsStyle: grow, align: align, gap: spacing, justify: justify },
            icon && iconPosition === "left" && (React.createElement(Icon, { icon: icon, size: iconSize, color: getGlyphColor(color, disabled, bare) })),
            labelElement,
            icon && iconPosition === "right" && (React.createElement(Icon, { icon: icon, size: iconSize, color: getGlyphColor(color, disabled, bare) })))));
});
