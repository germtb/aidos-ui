import { jsx as _jsx } from "react/jsx-runtime";
import { cssVar, getTextColor, jss } from "./jss";
const fontSize = {
    xsmall: cssVar("--font-xsmall"),
    small: cssVar("--font-small"),
    medium: cssVar("--font-medium"),
    large: cssVar("--font-large"),
    xlarge: cssVar("--font-xlarge"),
    xxlarge: cssVar("--font-xxlarge"),
    xxxlarge: cssVar("--font-xxxlarge"),
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