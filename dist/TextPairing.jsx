import React from "react";
import { createJSStyles, } from "./Palette";
import { Text } from "./Text";
import { Row } from "./Row";
import { BaseView } from "./BaseView";
import { Column } from "./Column";
const jsStyles = createJSStyles({
    overflow: {
        overflow: "hidden",
    },
    headline: {
        display: "flex",
        textAlign: "start",
    },
    body: {
        marginTop: "var(--spacing-xs)",
        textAlign: "start",
    },
});
export function TextPairing({ headline, body, headlineColor = "primary", headlineSize = "medium", headlineAddOn, bodyColor = "secondary", bodySize = "medium", bodyDisplay = "inline", addOn, addOnPosition = "left", gap = "small", align = "stretch", grow, shrink, padding, }) {
    const textElement = (<Column grow={grow} shrink={shrink} padding={addOn ? undefined : padding} componentName={["TextPairing"]} align={align} jsStyle={jsStyles.overflow}>
      <Row align="center" jsStyle={jsStyles.headline}>
        <Text color={headlineColor} size={headlineSize}>
          {headline}
        </Text>
        {headlineAddOn && <BaseView>{headlineAddOn}</BaseView>}
      </Row>
      {body && (<Row align="center" jsStyle={jsStyles.body}>
          <Text display={bodyDisplay} color={bodyColor} size={bodySize}>
            {body}
          </Text>
        </Row>)}
    </Column>);
    if (addOn) {
        return (<Row grow={grow} shrink={shrink} gap={gap} align="center" padding={padding} jsStyle={jsStyles.overflow}>
        {addOnPosition === "left" && addOn}
        {textElement}
        {addOnPosition === "right" && addOn}
      </Row>);
    }
    return textElement;
}
//# sourceMappingURL=TextPairing.jsx.map