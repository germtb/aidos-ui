import React, { ReactNode } from "react";
import {
  Align,
  createJSStyles,
  Position,
  Gap,
  TextColor,
  Size,
  Padding,
} from "./Palette";
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
  addOnPosition = "left",
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
      componentName={["TextPairing"]}
      align={align}
    >
      <Row align="center" jsStyle={jsStyles.headline}>
        <Text color={headlineColor} size={headlineSize}>
          {headline}
        </Text>
        {headlineAddOn && <BaseView>{headlineAddOn}</BaseView>}
      </Row>
      {body && (
        <Row align="center" jsStyle={jsStyles.body}>
          <Text display="block" color={bodyColor} size={bodySize}>
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
      >
        {addOnPosition === "left" && addOn}
        {textElement}
        {addOnPosition === "right" && addOn}
      </Row>
    );
  }

  return textElement;
}
