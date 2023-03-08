import React from "react";
import { createJSStyles, } from "./Palette";
import { Text } from "./Text";
import { Row } from "./Row";
import { BaseView } from "./BaseView";
import { Column } from "./Column";
const jsStyles = createJSStyles({
    headline: {
        display: "flex",
        textAlign: "start",
    },
    body: {
        marginTop: "var(--spacing-xs)",
        textAlign: "start",
    },
});
export function TextPairing({ headline, body, headlineColor = "primary", headlineSize = "medium", headlineAddOn, bodyColor = "secondary", bodySize = "medium", addOn, addOnPosition = "left", gap = "small", align = "stretch", grow, shrink, padding, }) {
    const textElement = (React.createElement(Column, { grow: grow, shrink: shrink, padding: addOn ? undefined : padding, componentName: ["TextPairing"], align: align },
        React.createElement(Row, { align: "center", jsStyle: jsStyles.headline },
            React.createElement(Text, { color: headlineColor, size: headlineSize }, headline),
            headlineAddOn && React.createElement(BaseView, null, headlineAddOn)),
        body && (React.createElement(Row, { align: "center", jsStyle: jsStyles.body },
            React.createElement(Text, { display: "block", color: bodyColor, size: bodySize }, body)))));
    if (addOn) {
        return (React.createElement(Row, { grow: grow, shrink: shrink, gap: gap, align: "center", padding: padding },
            addOnPosition === "left" && addOn,
            textElement,
            addOnPosition === "right" && addOn));
    }
    return textElement;
}
//# sourceMappingURL=TextPairing.js.map