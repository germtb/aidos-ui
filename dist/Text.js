import { jsx as _jsx } from "react/jsx-runtime";
import { getTextColor, jss } from "./jss";
const fontSize = {
    xsmall: "0.75rem",
    small: "1rem",
    medium: "1.25rem",
    large: "1.5rem",
    xlarge: "2rem",
    xxlarge: "3rem",
    xxxlarge: "4rem",
};
export function Text({ children, color = "primary", size = "medium", align = "none", bold = false, ellipsis = "default", grow, type: Type = "span", jsStyle, id, htmlFor, }) {
    if (ellipsis === "default") {
        ellipsis = Type === "span" || Type === "label";
    }
    const className = jss([
        getTextColor(color),
        { fontSize: fontSize[size], padding: 0, margin: 0 },
        bold && { fontWeight: "bold" },
        align === "center" && { textAlign: "center" },
        ellipsis && {
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
        },
        grow && { flexGrow: 1 },
        jsStyle,
    ]);
    return (_jsx(Type, { id: id, className: className, htmlFor: htmlFor, children: children }));
}
export function Label({ size = "small", type = "label", ...rest }) {
    return _jsx(Text, { size: size, type: type, ...rest });
}
export function Span({ size = "small", type = "span", ...rest }) {
    return _jsx(Text, { size: size, type: type, ...rest });
}
export function P({ size = "small", type = "p", ...rest }) {
    return _jsx(Text, { size: size, type: type, ...rest });
}
export function H1({ size = "xlarge", type = "h1", ...rest }) {
    return _jsx(Text, { size: size, type: type, ...rest });
}
export function H2({ size = "large", type = "h2", ...rest }) {
    return _jsx(Text, { size: size, type: type, ...rest });
}
export function H3({ size = "medium", type = "h3", ...rest }) {
    return _jsx(Text, { size: size, type: type, ...rest });
}
export function Li({ size = "small", type = "li", ...rest }) {
    return _jsx(Text, { size: size, type: type, ...rest });
}
//# sourceMappingURL=Text.js.map