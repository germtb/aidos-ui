import React, { ReactNode } from "react";
import { BaseListItem } from "./BaseListItem";
import { Position } from "./jss";

export function ListHeaderItem({
  highlight,
  headline,
  body,
  addOn,
  addOnPosition,
}: {
  highlight?: boolean;
  headline: string;
  body?: string;
  addOn?: ReactNode;
  addOnPosition?: Position;
}) {
  return (
    <BaseListItem
      headline={headline}
      headlineColor={highlight ? "highlight" : "primary"}
      headlineBold={true}
      body={body}
      addOn={addOn}
      addOnPosition={addOnPosition}
    >
      {({ content }) => content}
    </BaseListItem>
  );
}
