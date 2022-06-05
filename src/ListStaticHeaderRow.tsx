import React, { ReactNode } from "react";
import ListStaticRow from "./ListStaticRow";

export default function ListStaticHeaderRow({
  label,
  body,
  secondaryAddOn,
}: {
  label: string;
  body?: ReactNode;
  secondaryAddOn?: ReactNode;
}) {
  return (
    <ListStaticRow
      headline={label}
      headlineColor="secondary"
      background="secondary"
      secondaryAddOn={secondaryAddOn}
      body={body}
    />
  );
}
