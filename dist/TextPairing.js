import React from "react";
import { Text } from "./Text";
import { Row } from "./Row";
import { BaseView } from "./BaseView";
import { Column } from "./Column";
import { cssVar } from "./jss";
export function TextPairing({ headline, body, headlineColor = "primary", headlineSize = "medium", headlineAddOn, bodyColor = "secondary", bodySize = "medium", bodyType = "span", addOn, addOnPosition = "start", gap = "small", align = "stretch", grow, shrink, padding, }) {
    const textElement = (React.createElement(Column, { grow: grow, shrink: shrink, padding: addOn ? undefined : padding, align: align, jsStyle: {
            overflow: "hidden",
        } },
        React.createElement(Row, { align: "center", jsStyle: {
                textAlign: "start",
            } },
            React.createElement(Text, { color: headlineColor, size: headlineSize }, headline),
            headlineAddOn && React.createElement(BaseView, null, headlineAddOn)),
        body && (React.createElement(Row, { align: "center", jsStyle: {
                marginTop: cssVar("--spacing-xs"),
                textAlign: "start",
            } },
            React.createElement(Text, { type: bodyType, color: bodyColor, size: bodySize }, body)))));
    if (addOn) {
        return (React.createElement(Row, { grow: grow, shrink: shrink, gap: gap, align: "center", padding: padding, jsStyle: {
                overflow: "hidden",
            } },
            addOnPosition === "start" && addOn,
            textElement,
            addOnPosition === "end" && addOn));
    }
    return textElement;
}
//# sourceMappingURL=TextPairing.js.map