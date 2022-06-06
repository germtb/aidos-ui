import React, { ReactNode } from "react";
import { Align, createJSStyles, Position, Spacing } from "./Palette";
import Text from "./Text";
import Row from "./Row";
import BaseView from "./BaseView";
import Column from "./Column";
import { GlyphColor, GlyphSize } from "./Glyph";

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

export type TextPairingProps = {
  headline: ReactNode;
  body?: ReactNode;
  headlineColor?: GlyphColor;
  headlineSize?: GlyphSize;
  headlineAddOn?: ReactNode;
  bodyColor?: GlyphColor;
  bodySize?: GlyphSize;
  addOn?: ReactNode;
  addOnPosition?: Position;
  spacing?: Spacing;
  align?: Align;
};

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
      <BaseView jsStyle={jsStyles.headline}>
        <Text color={headlineColor} size={headlineSize}>
          {headline}
        </Text>
        {headlineAddOn && <BaseView>{headlineAddOn}</BaseView>}
      </BaseView>
      {body && (
        <BaseView jsStyle={jsStyles.body}>
          <Text color={bodyColor} size={bodySize}>
            {body}
          </Text>
        </BaseView>
      )}
    </Column>
  );

  if (addOn) {
    return (
      <Row spacing={spacing} align="center">
        {addOnPosition === "left" && addOn}
        {textElement}
        {addOnPosition === "right" && addOn}
      </Row>
    );
  }

  return textElement;
}

export default TextPairing;
