import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BaseView } from "./BaseView";
import { Column } from "./Column";
import { getBackground } from "./jss";
export function MenuIcon({ open, color }) {
    return (_jsxs(Column, { gap: "small", children: [_jsx(Bar, { color: color, jsStyle: {
                    transform: open ? "rotateZ(135deg)" : "",
                    transformOrigin: "center",
                    top: open ? 8 : 0,
                } }), _jsx(Bar, { color: color, jsStyle: {
                    opacity: open ? 0 : 1,
                } }), _jsx(Bar, { color: color, jsStyle: {
                    transform: open ? "rotateZ(-135deg)" : "",
                    transformOrigin: "center",
                    top: open ? -8 : 0,
                } })] }));
}
function Bar({ jsStyle, color }) {
    return (_jsx(BaseView, { jsStyle: [
            {
                position: "relative",
                width: 24,
                height: 4,
                borderRadius: "1px",
                transition: "all 200ms ease-out",
            },
            getBackground(color),
            jsStyle,
        ] }));
}
//# sourceMappingURL=MenuIcon.js.map