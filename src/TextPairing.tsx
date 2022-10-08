import React, { ReactNode } from "react";
import {
  Align,
  createJSStyles,
  Position,
  Gap,
  TextColor,
  Size,
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
  spacing?: Gap;
  align?: Align;
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
  spacing = "small",
  align = "stretch",
}: TextPairingProps) {
  const textElement = (
    <Column componentName={["TextPairing"]} align={align}>
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
      <Row gap={spacing} align="center">
        {addOnPosition === "left" && addOn}
        {textElement}
        {addOnPosition === "right" && addOn}
      </Row>
    );
  }

  return textElement;
}
