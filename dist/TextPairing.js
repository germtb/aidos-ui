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
export function TextPairing({ headline, body, headlineColor = "primary", headlineSize = "medium", headlineAddOn, bodyColor = "secondary", bodySize = "medium", addOn, addOnPosition = "left", spacing = "small", align = "stretch", }) {
    const textElement = (React.createElement(Column, { componentName: ["TextPairing"], align: align },
        React.createElement(BaseView, { jsStyle: jsStyles.headline },
            React.createElement(Text, { color: headlineColor, size: headlineSize }, headline),
            headlineAddOn && React.createElement(BaseView, null, headlineAddOn)),
        body && (React.createElement(BaseView, { jsStyle: jsStyles.body },
            React.createElement(Text, { color: bodyColor, size: bodySize }, body)))));
    if (addOn) {
        return (React.createElement(Row, { gap: spacing, align: "center" },
            addOnPosition === "left" && addOn,
            textElement,
            addOnPosition === "right" && addOn));
    }
    return textElement;
}
