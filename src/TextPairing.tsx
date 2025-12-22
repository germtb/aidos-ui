import React, { ReactNode } from "react";

import { Text, TextType } from "./Text";
import { Row } from "./Row";
import { BaseView } from "./BaseView";
import { Column } from "./Column";
import {
  TextColor,
  Size,
  Position,
  Gap,
  Padding,
  Align,
  cssVar,
  JSStyle,
} from "./jss";

export interface TextPairingProps {
  headline: ReactNode;
  body?: ReactNode;
  headlineColor?: TextColor;
  headlineSize?: Size;
  headlineAddOn?: ReactNode;
  bodyColor?: TextColor;
  bodySize?: Size;
  addOn?: ReactNode;
  addOnPosition?: Position;
  gap?: Gap;
  padding?: Padding;
  align?: Align;
  grow?: boolean;
  shrink?: boolean;
  headlineBold?: boolean;
  jss?: JSStyle;
}

export function TextPairing({
  headline,
  body,
  headlineColor = "primary",
  headlineSize = "medium",
  headlineAddOn,
  bodyColor = "secondary",
  bodySize = "medium",
  addOn,
  addOnPosition = "start",
  gap = "small",
  align = "stretch",
  grow,
  shrink,
  headlineBold,
  padding,
  jss,
}: TextPairingProps) {
  const textElement = (
    <Column
      grow={grow}
      shrink={shrink}
      padding={addOn ? undefined : padding}
      align={align}
      jss={[
        {
          overflow: "hidden",
        },
        jss,
      ]}
    >
      <Row
        align="center"
        jss={{
          textAlign: "start",
        }}
      >
        <Text bold={headlineBold} color={headlineColor} size={headlineSize}>
          {headline}
        </Text>
        {headlineAddOn && <BaseView>{headlineAddOn}</BaseView>}
      </Row>
      {body && (
        <Row
          align="center"
          jss={{
            marginTop: cssVar("--spacing-xs"),
            textAlign: "start",
          }}
        >
          <Text ellipsis={true} color={bodyColor} size={bodySize}>
            {body}
          </Text>
        </Row>
      )}
    </Column>
  );

  if (addOn) {
    return (
      <Row
        grow={grow}
        shrink={shrink}
        gap={gap}
        align="center"
        padding={padding}
        jss={{
          overflow: "hidden",
        }}
      >
        {addOnPosition === "start" && addOn}
        {textElement}
        {addOnPosition === "end" && addOn}
      </Row>
    );
  }

  return textElement;
}
