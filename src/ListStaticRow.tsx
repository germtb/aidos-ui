import React, { ReactNode } from "react";
import { createJSStyles } from "./Palette";
import { TextPairing } from "./TextPairing";
import { BaseView } from "./BaseView";
import { BaseListRow, BaseListRowProps } from "./BaseListRow";
import { GlyphColor, GlyphSize } from "./Glyph";
import { Column } from "./Column";

const jsStyles = createJSStyles({
  root: {
    position: "relative",
    paddingRight: "var(--spacing-m)",
  },
  backgroundPrimary: {
    backgroundColor: "var(--primary-background)",
  },
  backgroundSecondary: {
    backgroundColor: "var(--secondary-background)",
  },
  view: {
    display: "flex",
    paddingTop: "var(--spacing-s)",
    paddingBottom: "var(--spacing-s)",
    flexGrow: 1,
  },
  primaryAddOn: {
    flexGrow: 0,
    flexShrink: 0,
  },
  textPairing: {
    flexGrow: 1,
    flexShrink: 0,
    justifyContent: "center",
  },
  secondaryAddOn: {
    display: "flex",
    flexGrow: 0,
    flexShrink: 0,
    flexDirection: "column",
    justifyContent: "center",
  },
  interactiveAddOn: {
    flexGrow: 0,
    flexShrink: 0,
  },
});

interface ListStaticRow extends BaseListRowProps {
  headline: string;
  headlineSize?: GlyphSize;
  headlineColor?: GlyphColor;
  body?: ReactNode;
  bodySize?: GlyphSize;
  bodyColor?: GlyphColor;
  primaryAddOn?: ReactNode;
  secondaryAddOn?: ReactNode;
  background?: "primary" | "secondary";
  role?: undefined;
}

export const ListStaticRow = React.forwardRef(
  (
    {
      headline,
      headlineSize = "medium",
      headlineColor = "primary",
      body,
      bodySize = "small",
      bodyColor = "secondary",
      primaryAddOn,
      secondaryAddOn,
      background = "primary",
      ...otherProps
    }: ListStaticRow,
    ref?: React.Ref<HTMLLIElement>
  ) => {
    return (
      <BaseListRow
        {...otherProps}
        componentName={["ListStaticRowView"]}
        indentation={primaryAddOn ? "none" : "medium"}
        jsStyle={[
          jsStyles.root,
          background === "primary" && jsStyles.backgroundPrimary,
          background === "secondary" && jsStyles.backgroundSecondary,
        ]}
        ref={ref}
      >
        <BaseView componentName={["ListStaticRowView"]} jsStyle={jsStyles.view}>
          {primaryAddOn && (
            <BaseView jsStyle={jsStyles.primaryAddOn}>{primaryAddOn}</BaseView>
          )}

          <Column
            componentName={["ListStaticRowView"]}
            jsStyle={jsStyles.textPairing}
          >
            <TextPairing
              headline={headline}
              headlineSize={headlineSize}
              headlineColor={headlineColor}
              body={body}
              bodySize={bodySize}
              bodyColor={bodyColor}
            />
          </Column>

          {secondaryAddOn && (
            <BaseView jsStyle={jsStyles.secondaryAddOn}>
              {secondaryAddOn}
            </BaseView>
          )}
        </BaseView>
      </BaseListRow>
    );
  }
);
