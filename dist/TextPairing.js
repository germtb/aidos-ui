import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Text } from "./Text";
import { Row } from "./Row";
import { BaseView } from "./BaseView";
import { Column } from "./Column";
import { cssVar, } from "./jss";
export function TextPairing({ headline, body, headlineColor = "primary", headlineSize = "medium", headlineAddOn, bodyColor = "secondary", bodySize = "medium", addOn, addOnPosition = "start", gap = "small", align = "stretch", grow, shrink, headlineBold, padding, jss, }) {
    const textElement = (_jsxs(Column, { grow: grow, shrink: shrink, padding: addOn ? undefined : padding, align: align, jss: [
            {
                overflow: "hidden",
            },
            jss,
        ], children: [_jsxs(Row, { align: "center", jss: {
                    textAlign: "start",
                }, children: [_jsx(Text, { bold: headlineBold, color: headlineColor, size: headlineSize, children: headline }), headlineAddOn && _jsx(BaseView, { children: headlineAddOn })] }), body && (_jsx(Row, { align: "center", jss: {
                    marginTop: cssVar("--spacing-xs"),
                    textAlign: "start",
                }, children: _jsx(Text, { ellipsis: true, color: bodyColor, size: bodySize, children: body }) }))] }));
    if (addOn) {
        return (_jsxs(Row, { grow: grow, shrink: shrink, gap: gap, align: "center", padding: padding, jss: {
                overflow: "hidden",
            }, children: [addOnPosition === "start" && addOn, textElement, addOnPosition === "end" && addOn] }));
    }
    return textElement;
}
//# sourceMappingURL=TextPairing.js.map