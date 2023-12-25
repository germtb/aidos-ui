import React from "react";
import { Text } from "./Text";
import { Row } from "./Row";
import { BaseView } from "./BaseView";
import { Column } from "./Column";
import { cssVar, } from "./jss";
export function TextPairing({ headline, body, headlineColor = "primary", headlineSize = "medium", headlineAddOn, bodyColor = "secondary", bodySize = "medium", addOn, addOnPosition = "start", gap = "small", align = "stretch", grow, shrink, headlineBold, padding, jsStyle, }) {
    const textElement = (<Column grow={grow} shrink={shrink} padding={addOn ? undefined : padding} align={align} jsStyle={[
            {
                overflow: "hidden",
            },
            jsStyle,
        ]}>
      <Row align="center" jsStyle={{
            textAlign: "start",
        }}>
        <Text bold={headlineBold} color={headlineColor} size={headlineSize}>
          {headline}
        </Text>
        {headlineAddOn && <BaseView>{headlineAddOn}</BaseView>}
      </Row>
      {body && (<Row align="center" jsStyle={{
                marginTop: cssVar("--spacing-xs"),
                textAlign: "start",
            }}>
          <Text ellipsis={true} color={bodyColor} size={bodySize}>
            {body}
          </Text>
        </Row>)}
    </Column>);
    if (addOn) {
        return (<Row grow={grow} shrink={shrink} gap={gap} align="center" padding={padding} jsStyle={{
                overflow: "hidden",
            }}>
        {addOnPosition === "start" && addOn}
        {textElement}
        {addOnPosition === "end" && addOn}
      </Row>);
    }
    return textElement;
}
//# sourceMappingURL=TextPairing.jsx.map