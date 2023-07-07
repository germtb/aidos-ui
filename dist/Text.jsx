import React from "react";
import { getTextColor, jss } from "./JSS";
const jsStyles = {
    ellipsis: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
    size1: {
        fontSize: 10,
        lineHeight: "1.5rem",
    },
    size2: {
        fontSize: 14,
        lineHeight: "1.5rem",
    },
    size3: {
        fontSize: 18,
        lineHeight: "1.5rem",
    },
    size4: {
        fontWeight: "bold",
        fontSize: 24,
        lineHeight: "1.5rem",
    },
    size5: {
        fontWeight: "bold",
        fontSize: 30,
        lineHeight: "1.5rem",
    },
    textAlignCenter: {
        textAlign: "center",
    },
    grow: {
        flexGrow: 1,
    },
};
export function Text({ children, color = "primary", size = "medium", align = "none", ellipsis = "default", grow, type: Type = "span", jsStyle, }) {
    if (ellipsis === "default") {
        ellipsis = Type === "span";
    }
    return (<Type className={jss([
            getTextColor(color),
            size === "xsmall" && jsStyles.size1,
            size === "small" && jsStyles.size2,
            size === "medium" && jsStyles.size3,
            size === "large" && jsStyles.size4,
            size === "xlarge" && jsStyles.size5,
            align === "center" && jsStyles.textAlignCenter,
            ellipsis && jsStyles.ellipsis,
            grow && jsStyles.grow,
            jsStyle,
        ])}>
      {children}
    </Type>);
}
export function Span({ size = "small", type = "span", ...rest }) {
    return <Text size={size} type={type} {...rest}/>;
}
export function P({ size = "small", type = "p", ...rest }) {
    return <Text size={size} type={type} {...rest}/>;
}
export function H1({ size = "large", type = "h1", ...rest }) {
    return <Text size={size} type={type} {...rest}/>;
}
export function H2({ size = "medium", type = "h2", ...rest }) {
    return <Text size={size} type={type} {...rest}/>;
}
export function H3({ size = "small", type = "h3", ...rest }) {
    return <Text size={size} type={type} {...rest}/>;
}
//# sourceMappingURL=Text.jsx.map