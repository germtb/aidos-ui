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
  jsStyle?: JSStyle;
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
  jsStyle,
}: TextPairingProps) {
  const textElement = (
    <Column
      grow={grow}
      shrink={shrink}
      padding={addOn ? undefined : padding}
      align={align}
      jsStyle={[
        {
          overflow: "hidden",
        },
        jsStyle,
      ]}
    >
      <Row
        align="center"
        jsStyle={{
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
          jsStyle={{
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
