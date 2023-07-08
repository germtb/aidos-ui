import React from "react";
import { getTextColor, jss } from "./jss";
const fontSize = {
    xsmall: 10,
    small: 14,
    medium: 18,
    large: 24,
    xlarge: 30,
};
export function Text({ children, color = "primary", size = "medium", align = "none", bold = false, ellipsis = "default", grow, type: Type = "span", jsStyle, }) {
    if (ellipsis === "default") {
        ellipsis = Type === "span";
    }
    return (React.createElement(Type, { className: jss([
            getTextColor(color),
            { fontSize: fontSize[size], lineHeight: "1.7rem" },
            bold && { fontWeight: "bold" },
            align === "center" && { textAlign: "center" },
            ellipsis && {
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
            },
            grow && { flexGrow: 1 },
            jsStyle,
        ]) }, children));
}
export function Span({ size = "small", type = "span", ...rest }) {
    return React.createElement(Text, { size: size, type: type, ...rest });
}
export function P({ size = "small", type = "p", ...rest }) {
    return React.createElement(Text, { size: size, type: type, ...rest });
}
export function H1({ size = "large", type = "h1", ...rest }) {
    return React.createElement(Text, { size: size, type: type, ...rest });
}
export function H2({ size = "medium", type = "h2", ...rest }) {
    return React.createElement(Text, { size: size, type: type, ...rest });
}
export function H3({ size = "small", type = "h3", ...rest }) {
    return React.createElement(Text, { size: size, type: type, ...rest });
}
//# sourceMappingURL=Text.js.map