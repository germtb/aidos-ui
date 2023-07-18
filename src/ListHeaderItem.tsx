import React, { ReactNode } from "react";
import { BaseListItem } from "./BaseListItem";
import { Position, cssVar } from "./jss";

export function ListHeaderItem({
  bare,
  headline,
  body,
  withDivider,
  addOn,
  addOnPosition,
}: {
  bare?: boolean;
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
      headlineColor="primary"
      headlineBold={true}
      body={body}
      addOn={addOn}
      addOnPosition={addOnPosition}
      withDivider={bare ? false : withDivider}
      jsStyle={bare ? null : { background: cssVar("--secondary-background") }}
    >
      {({ content }) => content}
    </BaseListItem>
  );
}
