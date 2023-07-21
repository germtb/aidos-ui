import React, { ReactNode } from "react";
import { BaseListItem } from "./BaseListItem";
import { Position, cssVar } from "./jss";

export function ListHeaderItem({
  bare,
  highlight,
  headline,
  body,
  withDivider,
  addOn,
  addOnPosition,
}: {
  bare?: boolean;
  highlight?: boolean;
  headline: string;
  body?: string;
  withDivider?: boolean;
  addOn?: ReactNode;
  addOnPosition?: Position;
}) {
  return (
    <BaseListItem
      bare={bare}
      headline={headline}
      headlineColor={highlight ? (bare ? "highlight" : "light") : "primary"}
      headlineBold={true}
      body={body}
      addOn={addOn}
      addOnPosition={addOnPosition}
      withDivider={bare ? false : withDivider}
      jsStyle={
        bare
          ? null
          : {
              background: highlight
                ? cssVar("--highlight")
                : cssVar("--secondary-background"),
            }
      }
    >
      {({ content }) => content}
    </BaseListItem>
  );
}
