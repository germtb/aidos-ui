import React, { ReactNode } from "react";
import { ListStaticRow } from "./ListStaticRow";

export function ListStaticHeaderRow({
  label,
  body,
  secondaryAddOn,
  withDivider,
}: {
  label: string;
  body?: ReactNode;
  secondaryAddOn?: ReactNode;
  withDivider?: boolean;
}) {
  return (
    <ListStaticRow
      headline={label}
      headlineColor="secondary"
      background="secondary"
      secondaryAddOn={secondaryAddOn}
      body={body}
      withDivider={withDivider}
    />
  );
}
