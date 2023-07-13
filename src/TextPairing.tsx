import React, { ReactNode } from "react";

import { Text, TextType } from "./Text";
import { Row } from "./Row";
import { BaseView } from "./BaseView";
import { Column } from "./Column";
import { TextColor, Size, Position, Gap, Padding, Align, cssVar } from "./jss";

export interface TextPairingProps {
  headline: ReactNode;
  body?: ReactNode;
  headlineColor?: TextColor;
  headlineSize?: Size;
  headlineAddOn?: ReactNode;
  bodyColor?: TextColor;
  bodySize?: Size;
  bodyType?: TextType;
  addOn?: ReactNode;
  addOnPosition?: Position;
  gap?: Gap;
  padding?: Padding;
  align?: Align;
  grow?: boolean;
  shrink?: boolean;
}

export function TextPairing({
  headline,
  body,
  headlineColor = "primary",
  headlineSize = "medium",
  headlineAddOn,
  bodyColor = "secondary",
  bodySize = "medium",
  bodyType = "span",
  addOn,
  addOnPosition = "start",
  gap = "small",
  align = "stretch",
  grow,
  shrink,
  padding,
}: TextPairingProps) {
  const textElement = (
    <Column
      grow={grow}
      shrink={shrink}
      padding={addOn ? undefined : padding}
      align={align}
      jsStyle={{
        overflow: "hidden",
      }}
    >
      <Row
        align="center"
        jsStyle={{
          textAlign: "start",
        }}
      >
        <Text color={headlineColor} size={headlineSize}>
          {headline}
        </Text>
        {headlineAddOn && <BaseView>{headlineAddOn}</BaseView>}
      </Row>
      {body && (
        <Row
          align="center"
          jsStyle={{
            marginTop: cssVar("--spacing-xs"),
            textAlign: "start",
          }}
        >
          <Text type={bodyType} color={bodyColor} size={bodySize}>
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
        jsStyle={{
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
