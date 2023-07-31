import React, { ReactNode } from "react";
import { BaseListItem } from "./BaseListItem";
import { Position, cssVar } from "./jss";
import { useListContext } from "./List";

export function ListHeaderItem({
  highlight,
  headline,
  body,
  withDivider,
  addOn,
  addOnPosition,
}: {
  highlight?: boolean;
  headline: string;
  body?: string;
  withDivider?: boolean;
  addOn?: ReactNode;
  addOnPosition?: Position;
}) {
  const { bare } = useListContext();

  return (
    <BaseListItem
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
              backgroundColor: highlight
                ? cssVar("--highlight")
                : cssVar("--secondary-background"),
            }
      }
    >
      {({ content }) => content}
    </BaseListItem>
  );
}
