import React, { ReactNode } from "react";
import { createJSStyles } from "./Palette";
import Text from "./Text";
import Row, { RowSpacing } from "./Row";
import BaseView from "./BaseView";
import Column from "./Column";
import { GlyphColor, GlyphSize } from "./Glyph";

const jsStyles = createJSStyles({
  root: {
    alignItems: "flex-start",
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

export type TextPairingProps = {
  headline: ReactNode;
  body?: ReactNode;
  headlineColor?: GlyphColor;
  headlineSize?: GlyphSize;
  headlineAddOn?: ReactNode;
  bodyColor?: GlyphColor;
  bodySize?: GlyphSize;
  primaryAddOn?: ReactNode;
  spacing?: RowSpacing;
};

export function TextPairing({
  headline,
  body,
  headlineColor = "primary",
  headlineSize = "medium",
  headlineAddOn,
  bodyColor = "secondary",
  bodySize = "medium",
  primaryAddOn,
  spacing = "small",
}: TextPairingProps) {
  const textElement = (
    <Column componentName="TextPairing" jsStyle={jsStyles.root}>
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

  if (primaryAddOn) {
    return (
      <Row spacing={spacing}>
        {primaryAddOn}
        {textElement}
      </Row>
    );
  }

  return textElement;
}

export default TextPairing;
